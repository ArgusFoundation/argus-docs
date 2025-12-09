# Squads Protocol V4 Integration

ARGUS leverages **Squads Protocol V4**, Solana's premier multisig infrastructure, to implement its Argus Vault security model. This integration provides on-chain security guarantees that exist independently of the ARGUS infrastructure.

## What is Squads Protocol?

[Squads Protocol](https://squads.so/) is a battle-tested smart contract platform for multisig and program management on Solana. It's used by leading protocols including Jupiter, Mango Markets, and numerous DAOs to secure billions of dollars in on-chain assets.

### Key Features

- **Multisig Wallets**: M-of-N signature threshold requirements
- **Transaction Proposals**: On-chain proposal and approval workflow
- **Vault System**: Segregated asset storage with controlled access
- **Program Authority**: Upgrade authority management for smart contracts
- **Time Locks**: Optional delays for security-critical operations
- **Battle-Tested**: Audited, proven in production with major protocols

### Why Squads for ARGUS?

1. **On-Chain Security**: Multisig logic enforced by smart contract, not server
2. **Trustless Architecture**: ARGUS server cannot bypass security even if compromised
3. **Proven Track Record**: Used by major DeFi protocols securing $100M+
4. **Solana Native**: Optimized for Solana's architecture
5. **Open Source**: Fully auditable implementation
6. **Standard Compliance**: Compatible with Solana's standard token programs

## Squads V4 Architecture

### Program Address

```
Program ID: SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf
```

This is the on-chain program that governs all multisig operations. It's deployed on Solana mainnet and cannot be modified.

### Core Concepts

#### 1. Multisig Account

The multisig account is the **control structure** that defines:
- Who can propose transactions (members)
- How many signatures are required (threshold)
- Configuration and permissions

**PDA Derivation**:
```typescript
const [multisigPDA] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("multisig"),
    createKey.publicKey.toBuffer(),     // Creator public key
    Buffer.from("ARGUS"),                // Optional memo/identifier
  ],
  SQUADS_PROGRAM_ID
);
```

**Structure**:
```typescript
interface Multisig {
  threshold: number;              // Required signatures (ARGUS: 2)
  members: PublicKey[];           // [User's Master Key, ARGUS Server]
  transactionIndex: number;       // Counter for proposal ordering
  createKey: PublicKey;           // Original creator
  authority: PublicKey;           // Derived authority for vault control
}
```

#### 2. Vault Account

The vault is the **asset container** that holds actual funds:

**PDA Derivation**:
```typescript
const [vaultPDA] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("vault"),
    multisigPDA.toBuffer(),              // Parent multisig
    new Uint8Array([vaultIndex]),        // Vault number (0 for primary)
  ],
  SQUADS_PROGRAM_ID
);
```

**Characteristics**:
- Owned by the multisig (can only be controlled via proposals)
- Can hold SOL and SPL tokens
- Cannot sign transactions itself (controlled by multisig authority)
- Rent-exempt (requires ~0.01 SOL minimum balance)

#### 3. Transaction Proposal

A proposal is an **on-chain record** of a pending transaction:

**PDA Derivation**:
```typescript
const [proposalPDA] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("transaction"),
    multisigPDA.toBuffer(),
    new Uint8Array(
      new BigInt(transactionIndex).toArrayLike(Buffer, "le", 8)
    ),
  ],
  SQUADS_PROGRAM_ID
);
```

**Structure**:
```typescript
interface VaultTransaction {
  multisig: PublicKey;             // Parent multisig
  index: number;                   // Transaction number
  creator: PublicKey;              // Who created the proposal
  programId: PublicKey;            // Target program (e.g., System Program)
  accounts: AccountMeta[];         // Accounts involved
  data: Buffer;                    // Instruction data
  approvals: PublicKey[];          // Members who have signed
  status: TransactionStatus;       // Draft, Active, Executed, Rejected
  instructionIndex: number;        // For multi-instruction proposals
}
```

## ARGUS Multisig Configuration

### Member Structure

ARGUS uses a **2-of-2 multisig** configuration:

```
┌─────────────────────────────────────────┐
│         Squads Multisig                  │
├─────────────────────────────────────────┤
│  Threshold: 2 of 2                      │
│                                          │
│  Member 1: User's Master Key             │
│    Role: Transaction creator & signer    │
│    Has: Private key (user-controlled)    │
│    Purpose: Initiate and approve own txs │
│                                          │
│  Member 2: ARGUS Backend Server          │
│    Role: Co-signer after verification    │
│    Has: Private key (server-controlled)  │
│    Purpose: Verify security layers       │
│                                          │
│  Authority: Multisig-derived PDA         │
│    Controls: Vault withdrawals           │
└─────────────────────────────────────────┘
```

### Security Model

**Key Insight**: Both signatures are required, so:

- **User alone** cannot execute transactions (needs server approval)
- **Server alone** cannot execute transactions (needs user proposal + signature)
- **Attacker with user's key** cannot execute (needs server approval, which requires passing security layers)
- **Compromised server** cannot steal funds (cannot create valid proposals without user's signature)

This creates a **trustless security model** where neither party has unilateral control.

## Transaction Flow

### Complete End-to-End Flow

```
┌─────────────────────────────────────────────────────────┐
│  Step 1: User Initiates Transaction                     │
│  ─────────────────────────────────────────────────────  │
│  User: "Send 1 SOL to <recipient>"                      │
│  ARGUS: Creates transaction proposal object             │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│  Step 2: Create Proposal On-Chain                       │
│  ─────────────────────────────────────────────────────  │
│  Instruction: VaultTransactionCreate                    │
│  Parameters:                                             │
│    - vaultIndex: 0                                      │
│    - programId: System Program                          │
│    - accounts: [vault (signer), recipient, system]      │
│    - data: [transfer, 1 SOL]                            │
│  Signer: User's Master Key                              │
│  Result: Proposal created with status "Active"          │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│  Step 3: User Signs Proposal                            │
│  ─────────────────────────────────────────────────────  │
│  Instruction: ProposalApprove                           │
│  Signer: User's Master Key                              │
│  Result: proposal.approvals = [User's Public Key]       │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│  Step 4: Security Verification                          │
│  ─────────────────────────────────────────────────────  │
│  ARGUS Client → ARGUS Server:                           │
│    - Voice recording                                    │
│    - GPS coordinates                                    │
│    - Hardware key confirmation                          │
│    - Bluetooth device ID                                │
│    - Biometric signature                                │
│                                                          │
│  Server validates each layer sequentially               │
│    ✓ Voice match > 75% confidence                       │
│    ✓ Location within geo-fence                          │
│    ✓ Hardware key matches registered device             │
│    ✓ Bluetooth device detected                          │
│    ✓ Biometric signature valid                          │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│  Step 5: Server Co-Signs Proposal                       │
│  ─────────────────────────────────────────────────────  │
│  IF all verifications passed:                           │
│    Instruction: ProposalApprove                         │
│    Signer: ARGUS Server Key                             │
│    Result: proposal.approvals = [User, Server]          │
│  ELSE:                                                   │
│    Return error, transaction rejected                   │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│  Step 6: Execute Transaction                            │
│  ─────────────────────────────────────────────────────  │
│  Check: proposal.approvals.length >= threshold (2)      │
│  Instruction: VaultTransactionExecute                   │
│  Signer: Any member (usually user)                      │
│  Result: Transaction executes from vault                │
│  Status: proposal.status = "Executed"                   │
└───────────────────┬─────────────────────────────────────┘
                    │
┌───────────────────▼─────────────────────────────────────┐
│  Step 7: Confirmation                                    │
│  ─────────────────────────────────────────────────────  │
│  Solana network confirms transaction                    │
│  User sees success message                              │
│  Balance updates in UI                                  │
└─────────────────────────────────────────────────────────┘
```

### Code Implementation

**Creating a Proposal**:
```typescript
import * as multisig from "@sqds/multisig";

// Create the proposal
const createIx = multisig.instructions.vaultTransactionCreate({
  multisigPda: argusVaultMultisig,
  transactionIndex: nextTransactionIndex,
  creator: masterKeyPublic,
  vaultIndex: 0,
  ephemeralSigners: 0,
  transactionMessage: transactionMessage,  // Encoded transaction
  memo: "ARGUS Argus Vault Transfer",
});

// User signs and submits
const signature = await sendAndConfirmTransaction(
  connection,
  createIx,
  [masterKeyKeypair],  // User's private key signs
);
```

**Server Approval** (after verification):
```typescript
// Server-side code (Node.js)
const approveIx = multisig.instructions.proposalApprove({
  multisigPda: argusVaultMultisig,
  transactionIndex: transactionIndex,
  member: serverPublicKey,
});

const signature = await sendAndConfirmTransaction(
  connection,
  approveIx,
  [serverKeypair],  // Server's private key signs
);
```

**Execution**:
```typescript
// Can be called by user after server approval
const executeIx = multisig.instructions.vaultTransactionExecute({
  multisigPda: argusVaultMultisig,
  transactionIndex: transactionIndex,
  member: masterKeyPublic,
});

const signature = await sendAndConfirmTransaction(
  connection,
  executeIx,
  [masterKeyKeypair],
);
```

## Account Structure

### On-Chain Data

When you create a Argus Vault, these accounts are created on Solana:

```
┌────────────────────────────────────────────────┐
│  Multisig Account                               │
│  Address: <multisigPDA>                         │
│  Size: ~200 bytes                               │
│  Rent: ~0.002 SOL                               │
│  Owner: Squads Program                          │
│  ──────────────────────────────────────────    │
│  Data:                                          │
│    - threshold: 2                               │
│    - members: [User, Server]                    │
│    - transactionIndex: 0 → 1 → 2 → ...         │
│    - createKey: User's public key               │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  Vault Account (holds funds)                    │
│  Address: <vaultPDA>                            │
│  Size: 0 bytes (just an address)                │
│  Rent: ~0.0009 SOL (rent-exempt minimum)        │
│  Owner: System Program                          │
│  ──────────────────────────────────────────    │
│  Can hold:                                      │
│    - SOL (native balance)                       │
│    - SPL tokens (via associated token accounts) │
│  Controlled by: Multisig authority              │
└────────────────────────────────────────────────┘

┌────────────────────────────────────────────────┐
│  Transaction Proposal (per transaction)         │
│  Address: <proposalPDA>                         │
│  Size: ~500 bytes (varies)                      │
│  Rent: ~0.005 SOL                               │
│  Owner: Squads Program                          │
│  ──────────────────────────────────────────    │
│  Data:                                          │
│    - status: Active/Executed/Rejected           │
│    - creator: User's public key                 │
│    - approvals: [User, Server] (when approved)  │
│    - transactionMessage: Encoded instruction    │
└────────────────────────────────────────────────┘
```

### Cost Breakdown

Creating a Argus Vault requires SOL for rent:

| Account | Rent Cost | Purpose |
|---------|-----------|---------|
| Multisig Account | ~0.002 SOL | Stores multisig configuration |
| Vault Account | ~0.001 SOL | Rent-exempt minimum balance |
| Transaction Fee | ~0.00001 SOL | Network fee for creation transaction |
| **Total** | **~0.003 SOL** | One-time setup cost |

Per-transaction costs:

| Operation | Cost | Refundable |
|-----------|------|------------|
| Create Proposal | ~0.005 SOL | ✅ Yes (when executed/rejected) |
| Approve (User) | ~0.000005 SOL | ❌ No (network fee) |
| Approve (Server) | ~0.000005 SOL | ❌ No (network fee) |
| Execute | ~0.000005 SOL | ❌ No (network fee) |
| **Total** | **~0.005 SOL** | Proposal rent refunded |

## Security Guarantees

### What Squads Enforces On-Chain

1. **Threshold Requirement**: Transaction CANNOT execute without 2 signatures
2. **Member Verification**: Only registered members can sign proposals
3. **Proposal Immutability**: Approved proposals cannot be altered
4. **Vault Control**: Only multisig authority can move funds from vault
5. **Transaction Ordering**: Proposals execute in sequential order

### What ARGUS Adds Off-Chain

The Squads contract only verifies **signatures**. ARGUS adds **authorization** logic:

- Voice biometric verification
- Geographic location verification
- Hardware key verification
- Bluetooth device verification
- Platform biometric verification

**Critical**: Even if an attacker bypasses ARGUS's off-chain verification (e.g., exploits server), they still need the **server's private key** to sign proposals. The server key is:
- Stored in HSM (Hardware Security Module) in production
- Protected by encryption at rest
- Requires multiple operations team members for access (in DAO structure)
- Rotatable via multisig update

## Attack Scenarios Analysis

### Scenario 1: User's Private Key Stolen

**Attacker has**: User's seed phrase, can sign transactions

**Attacker tries**:
1. Create proposal from compromised key ✅ (allowed)
2. Sign proposal ✅ (allowed)
3. Request server approval ❌ (fails voice verification)
4. Attempt to fake voice ❌ (detection algorithms)
5. Attempt to spoof GPS ❌ (requires being at location)
6. Execute transaction ❌ (needs 2 signatures, only has 1)

**Result**: ❌ Attack fails, funds safe

### Scenario 2: ARGUS Server Compromised

**Attacker has**: Server access, can modify server code

**Attacker tries**:
1. Bypass security verification ✅ (attacker controls server)
2. Sign arbitrary proposals ❌ (needs proposals created by user first)
3. Create fake proposals ❌ (needs user's private key to sign proposal creation)
4. Execute existing user proposals without verification ✅ (possible)

**Risk**: If server is compromised WHILE user is creating a legitimate proposal, attacker could approve it maliciously.

**Mitigation**:
- Server private key in HSM (can't extract to modify code behavior)
- Multi-party server control (requires multiple team members)
- Transaction logs auditable on-chain
- Client shows full transaction details before creation
- DAO governance for server key updates

**Result**: ⚠️ Limited risk, requires precise timing + user action

### Scenario 3: ARGUS Server Private Key Stolen

**Attacker has**: Server's private key, can sign proposals

**Attacker tries**:
1. Sign arbitrary proposals ❌ (needs user to create them first)
2. Create proposals ❌ (needs user's key to sign proposal creation)
3. Wait for user to create proposal, then approve malicious modifications ❌ (proposals are immutable once created)

**Result**: ❌ Attack fails, funds safe (need user's key to create proposals)

### Scenario 4: Both Keys Stolen

**Attacker has**: User's key AND server's key

**Attacker tries**:
1. Create proposal ✅
2. Sign proposal (user) ✅
3. Approve proposal (server) ✅
4. Execute transaction ✅

**Result**: ✅ Attack succeeds

**Likelihood**: Extremely low (requires compromising both user's device and ARGUS server simultaneously)

**Mitigation**: This is the fundamental security assumption of any 2-of-2 multisig. Additional layers (voice, geo, hardware) make this scenario even less likely in practice.

## Advantages Over Traditional Multisig

### Traditional 2-of-2 Multisig
```
User 1 (Private Key 1) + User 2 (Private Key 2) = Transaction
```

**Problems**:
- Requires coordinating two people
- Other party may be unavailable
- Social trust required
- Complex key management

### ARGUS Argus Vault
```
User (Private Key + Security Layers) + Server (Conditional Approval) = Transaction
```

**Advantages**:
- ✅ Single user control (no coordination needed)
- ✅ Server always available
- ✅ Security layers instead of second person
- ✅ User maintains sovereignty

## Comparison to Hardware Wallets

| Feature | Ledger/Trezor | ARGUS Argus Vault |
|---------|---------------|-----------------|
| Security Model | Physical device | Multi-layered verification |
| Attack Surface | Device firmware | Device + biometrics + location |
| Convenience | Must connect device | Browser-based, multiple factors |
| Transaction Speed | 30-60 seconds | 30-60 seconds |
| Loss Recovery | Seed phrase only | Seed phrase + re-enrollment |
| Cost | $50-$200 hardware | Free (software only) |
| Multi-Device | Must carry device | Works from registered location |
| Geographic Security | ❌ No | ✅ Yes |
| Biometric Security | ❌ No (some models) | ✅ Yes (voice + platform) |
| Open Source | ❌ Closed firmware | ✅ Open source |

## Future Enhancements

### Planned Squads Features

1. **Timelock Support**
   - Add mandatory waiting periods for large transactions
   - Configurable delays (24hr, 48hr, 7 days)
   - Cancel window for suspicious transactions

2. **Multiple Threshold Tiers**
   - Small transactions: 2-of-2 (current)
   - Large transactions: Additional approval layers
   - Emergency recovery: M-of-N social recovery

3. **Transaction Policies**
   - Daily withdrawal limits
   - Whitelist-only recipients
   - Token-specific restrictions
   - Velocity checks

4. **Squads V5 Migration**
   - When Squads releases V5, ARGUS will support migration
   - Backward compatibility maintained
   - Optional feature upgrades

## Developer Resources

### Squads SDK

```bash
npm install @sqds/multisig
```

### Example: Query Multisig Info

```typescript
import * as multisig from "@sqds/multisig";
import { Connection, PublicKey } from "@solana/web3.js";

const connection = new Connection("https://api.mainnet-beta.solana.com");
const multisigPda = new PublicKey("Your_Multisig_PDA");

// Get multisig account data
const multisigAccount = await multisig.accounts.Multisig.fromAccountAddress(
  connection,
  multisigPda
);

console.log("Threshold:", multisigAccount.threshold);
console.log("Members:", multisigAccount.members);
console.log("Transaction Index:", multisigAccount.transactionIndex);
```

### Example: Query Proposal Status

```typescript
const [proposalPda] = multisig.getTransactionPda({
  multisigPda,
  index: BigInt(0),  // Transaction index
});

const proposal = await multisig.accounts.VaultTransaction.fromAccountAddress(
  connection,
  proposalPda
);

console.log("Status:", proposal.status);  // { active: {} }, { executed: {} }, etc.
console.log("Approvals:", proposal.approvals);
console.log("Creator:", proposal.creator);
```

## Documentation Links

- **Squads Protocol**: [https://squads.so](https://squads.so)
- **Squads Documentation**: [https://docs.squads.so](https://docs.squads.so)
- **SDK Reference**: [https://github.com/Squads-Protocol/v4](https://github.com/Squads-Protocol/v4)
- **Program Address**: `SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf`

## Conclusion

Squads Protocol V4 integration is the foundation of ARGUS Argus Vault security. By leveraging proven, audited, on-chain multisig infrastructure, ARGUS provides:

- **Trustless Security**: Smart contract enforcement, not server promises
- **Battle-Tested**: Used by major protocols securing $100M+
- **Transparent**: All approvals and transactions visible on-chain
- **Standard-Compliant**: Works with all Solana programs and tokens

The combination of Squads' on-chain multisig with ARGUS's off-chain verification layers creates unprecedented wallet security without sacrificing usability.

## Next Steps

- **[How GeoVault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - Understanding the complete security architecture
- **[Multisig Enforcement](/docs/argus-vault/multisig-enforcement-squads-v4)** - Detailed transaction lifecycle
- **[Security Layers](/docs/argus-vault/security-layers)** - All security options explained

---

**On-chain security guarantees. Off-chain intelligence. Unbreakable together.**



