# Squads V4 Integration

<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0', borderRadius: '12px', overflow: 'hidden'}}>
  <img src="/img/technology.jpg" alt="Squads Protocol V4 Technology" style={{width: '100%', maxWidth: '100%', height: 'auto', borderRadius: '12px'}} />
</div>

ARGUS leverages Squads Protocol V4, Solana's premier multisig infrastructure, to implement its Argus Vault security model. This integration provides on-chain security guarantees that exist independently of ARGUS infrastructure.

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

## ARGUS Multisig Configuration

### Member Structure

ARGUS uses a **2-of-2 multisig** configuration:

- **Member 1**: User's Wallet Key (transaction creator & signer)
- **Member 2**: ARGUS Backend Server (co-signer after verification)
- **Threshold**: 2 of 2 (both signatures required)

### Security Model

**Key Insight**: Both signatures are required, so:

- **User alone** cannot execute transactions (needs server approval)
- **Server alone** cannot execute transactions (needs user proposal + signature)
- **Attacker with user's key** cannot execute (needs server approval, which requires passing security layers)
- **Compromised server** cannot steal funds (cannot create valid proposals without user's signature)

This creates a **trustless security model** where neither party has unilateral control.

## Transaction Flow

### Complete End-to-End Flow

1. **User Initiates Transaction**: User creates transaction request
2. **Create Proposal On-Chain**: ARGUS creates Squads V4 multisig proposal
3. **User Signs Proposal**: User approves the proposal
4. **Security Verification**: ARGUS backend verifies all security layers
5. **Server Co-Signs Proposal**: Server co-signs if all verifications pass
6. **Execute Transaction**: Transaction executes via Squads V4
7. **Confirmation**: Transaction confirmed on Solana network

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

**Critical**: Even if an attacker bypasses ARGUS's off-chain verification, they still need the **server's private key** to sign proposals.

## Account Structure

When you create a Argus Vault, these accounts are created on Solana:

- **Multisig Account**: Stores multisig configuration (~0.002 SOL rent)
- **Vault Account**: Holds actual funds (rent-exempt minimum ~0.001 SOL)
- **Transaction Proposals**: Created per transaction (~0.005 SOL rent, refunded when executed)

## Cost Breakdown

### Creating a Argus Vault

- Multisig Account: ~0.002 SOL
- Vault Account: ~0.001 SOL
- Transaction Fee: ~0.00001 SOL
- **Total**: ~0.003 SOL (one-time setup cost)

### Per-Transaction Costs

- Create Proposal: ~0.005 SOL (rent, refunded when executed)
- Approve (User): ~0.000005 SOL (network fee)
- Approve (Server): ~0.000005 SOL (network fee)
- Execute: ~0.000005 SOL (network fee)
- **Total**: ~0.005 SOL (proposal rent refunded)

## Advantages Over Traditional Multisig

### Traditional 2-of-2 Multisig

**Problems**:
- Requires coordinating two people
- Other party may be unavailable
- Social trust required
- Complex key management

### ARGUS Argus Vault

**Advantages**:
- Single user control (no coordination needed)
- Server always available
- Security layers instead of second person
- User maintains sovereignty

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
| Geographic Security | No | Yes |
| Biometric Security | No (some models) | Yes (voice + platform) |
| Open Source | Closed firmware | Open source |

## Key Takeaways

1. **On-chain enforcement** via Squads V4 provides trustless security
2. **2-of-2 multisig** requires both user and server signatures
3. **Server co-signs** only after verifying all security layers
4. **Independent security** exists even if ARGUS infrastructure is compromised
5. **Proven infrastructure** used by major DeFi protocols

Squads V4 integration ensures that Argus Vault security is not just promised—it's enforced on-chain.

---

## Next Steps

- **[Multisig Enforcement](/docs/argus-vault/multisig-enforcement-squads-v4)** - Deep dive into enforcement mechanisms
- **[How Argus Vault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - Complete security flow
- **[Wallet Architecture Overview](/docs/argus-vault/wallet-architecture-overview)** - Understanding the system

