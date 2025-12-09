# Multisig Enforcement (Squads V4)

ARGUS uses Squads Protocol V4 to enforce multisig security on-chain. This provides security guarantees that exist independently of ARGUS infrastructure.

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

## ARGUS Multisig Configuration

### Member Structure

ARGUS uses a **2-of-2 multisig** configuration:

```
┌─────────────────────────────────────────┐
│         Squads Multisig                  │
├─────────────────────────────────────────┤
│  Threshold: 2 of 2                      │
│                                          │
│  Member 1: User's Wallet Key            │
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
Step 1: User Initiates Transaction
    ↓
Step 2: Create Proposal On-Chain
    ↓
Step 3: User Signs Proposal
    ↓
Step 4: Security Verification
    ↓
Step 5: Server Co-Signs Proposal
    ↓
Step 6: Execute Transaction
    ↓
Step 7: Confirmation
```

### Detailed Steps

#### Step 1: User Initiates Transaction

User creates transaction request through ARGUS UI.

#### Step 2: Create Proposal On-Chain

ARGUS creates a Squads V4 multisig proposal:

- **Instruction**: `VaultTransactionCreate`
- **Parameters**: Vault index, program ID, accounts, data
- **Signer**: User's wallet key
- **Result**: Proposal created with status "Active"

#### Step 3: User Signs Proposal

User approves the proposal:

- **Instruction**: `ProposalApprove`
- **Signer**: User's wallet key
- **Result**: `proposal.approvals = [User's Public Key]`

#### Step 4: Security Verification

ARGUS backend verifies all security layers:

- Voice biometric verification
- Geographic location verification
- Hardware key verification (if enabled)
- Bluetooth device verification (if enabled)
- Platform biometric verification (if enabled)

#### Step 5: Server Co-Signs Proposal

If all verifications pass:

- **Instruction**: `ProposalApprove`
- **Signer**: ARGUS Server Key
- **Result**: `proposal.approvals = [User, Server]`

If any verification fails:

- Transaction rejected
- User notified of failure reason

#### Step 6: Execute Transaction

Once both signatures are present:

- **Instruction**: `VaultTransactionExecute`
- **Check**: `proposal.approvals.length >= threshold (2)`
- **Result**: Transaction executes from vault

#### Step 7: Confirmation

Transaction confirmed on Solana network.

## On-Chain Security Guarantees

### What Squads Enforces

1. **Threshold Requirement**: Transaction CANNOT execute without 2 signatures
2. **Member Verification**: Only registered members can sign proposals
3. **Proposal Immutability**: Approved proposals cannot be altered
4. **Vault Control**: Only multisig authority can move funds from vault
5. **Transaction Ordering**: Proposals execute in sequential order

### What ARGUS Adds

The Squads contract only verifies **signatures**. ARGUS adds **authorization** logic:

- Voice biometric verification
- Geographic location verification
- Hardware key verification
- Bluetooth device verification
- Platform biometric verification

**Critical**: Even if an attacker bypasses ARGUS's off-chain verification, they still need the **server's private key** to sign proposals. The server key is:

- Stored in HSM (Hardware Security Module) in production
- Protected by encryption at rest
- Requires multiple operations team members for access
- Rotatable via multisig update

## Attack Scenarios

### Scenario 1: User's Private Key Stolen

**Attacker has**: User's seed phrase, can sign transactions

**Attacker tries**:
1. Create proposal from compromised key ✓ (allowed)
2. Sign proposal ✓ (allowed)
3. Request server approval ❌ (fails voice verification)
4. Attempt to fake voice ❌ (detection algorithms)
5. Attempt to spoof GPS ❌ (requires being at location)
6. Execute transaction ❌ (needs 2 signatures, only has 1)

**Result**: Attack fails, funds safe

### Scenario 2: ARGUS Server Compromised

**Attacker has**: Server access, can modify server code

**Attacker tries**:
1. Bypass security verification ✓ (attacker controls server)
2. Sign arbitrary proposals ❌ (needs proposals created by user first)
3. Create fake proposals ❌ (needs user's private key to sign proposal creation)
4. Execute existing user proposals without verification ✓ (possible)

**Risk**: If server is compromised WHILE user is creating a legitimate proposal, attacker could approve it maliciously.

**Mitigation**:
- Server private key in HSM (can't extract to modify code behavior)
- Multi-party server control (requires multiple team members)
- Transaction logs auditable on-chain
- Client shows full transaction details before creation
- DAO governance for server key updates

**Result**: Limited risk, requires precise timing + user action

### Scenario 3: ARGUS Server Private Key Stolen

**Attacker has**: Server's private key, can sign proposals

**Attacker tries**:
1. Sign arbitrary proposals ❌ (needs user to create them first)
2. Create proposals ❌ (needs user's key to sign proposal creation)
3. Wait for user to create proposal, then approve malicious modifications ❌ (proposals are immutable once created)

**Result**: Attack fails, funds safe (need user's key to create proposals)

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
- Single user control (no coordination needed)
- Server always available
- Security layers instead of second person
- User maintains sovereignty

## Key Takeaways

1. **On-chain enforcement** via Squads V4 provides trustless security
2. **2-of-2 multisig** requires both user and server signatures
3. **Server co-signs** only after verifying all security layers
4. **Immutable proposals** prevent modification after creation
5. **Independent security** exists even if ARGUS infrastructure is compromised

Squads V4 multisig enforcement ensures that security is not just promised—it's enforced on-chain.

---

## Next Steps

- **[Squads V4 Integration](/docs/argus-vault/squads-v4-integration)** - Deep dive into Squads integration
- **[How Argus Vault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - Complete security flow
- **[Wallet Architecture Overview](/docs/argus-vault/wallet-architecture-overview)** - Understanding the system

