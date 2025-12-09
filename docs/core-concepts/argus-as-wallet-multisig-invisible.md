# ARGUS as a Wallet (Multisig Made Invisible)

ARGUS is designed to feel like a normal wallet. Under the hood, however, it uses on-chain multisig infrastructure that's completely abstracted from the user experience.

## The Multisig Problem

Traditional multisig solutions have a fundamental usability problem:

- **Complex UI**: Users must understand multisig proposals, approvals, and execution
- **Coordination Overhead**: Multiple parties must coordinate to sign transactions
- **Institutional Complexity**: Designed for organizations, not individuals
- **High Friction**: Every transaction requires multiple steps and approvals

**Result**: Multisig is secure but impractical for most users.

## The ARGUS Solution

ARGUS solves this by making multisig **invisible**.

### User Experience

From the user's perspective, ARGUS works exactly like a normal wallet:

1. Click "Send"
2. Enter recipient and amount
3. Review transaction
4. Approve (with security verifications)
5. Transaction executes

**No multisig UI. No coordination. No complexity.**

### Under the Hood

Behind the scenes, ARGUS uses **Squads Protocol V4** to enforce on-chain multisig:

1. User creates transaction
2. ARGUS creates multisig proposal (on-chain)
3. User signs proposal
4. ARGUS server verifies security layers
5. Server co-signs if all verifications pass
6. Transaction executes via Squads smart contract

**Multisig is enforced, but the user never sees it.**

## How It Works

### Standard Wallet

For the standard wallet (daily use), ARGUS works like a traditional hot wallet:

- Single keypair
- Fast transactions
- No multisig overhead
- Standard wallet experience

**Use for**: Daily spending, DeFi, frequent transactions.

### Argus Vault

For Argus Vault (secure storage), ARGUS uses invisible multisig:

- Squads V4 multisig account
- 2-of-2 threshold (user + server)
- Security layers verified before server co-signs
- On-chain enforcement

**Use for**: Long-term holdings, high-value assets, maximum security.

## The Invisible Multisig Architecture

### Multisig Structure

```
Squads V4 Multisig
├── Member 1: User's Wallet Key
├── Member 2: ARGUS Server Key
└── Threshold: 2 of 2 (both signatures required)
```

### Transaction Flow

```
User Action
    ↓
ARGUS creates proposal (invisible to user)
    ↓
User signs (normal wallet experience)
    ↓
Security verification (voice, location, etc.)
    ↓
Server co-signs (if all verifications pass)
    ↓
Transaction executes (via Squads)
    ↓
User sees success (normal wallet experience)
```

**The user never interacts with multisig directly.**

## Benefits of Invisible Multisig

### For Users

- **Simple**: Works like a normal wallet
- **Fast**: No coordination delays
- **Secure**: On-chain multisig enforcement
- **Flexible**: Choose security level per use case

### For Security

- **On-Chain Enforcement**: Multisig rules enforced by smart contract
- **Independent of Infrastructure**: Security exists even if ARGUS servers are compromised
- **Transparent**: All approvals visible on-chain
- **Proven**: Built on Squads V4, used by major protocols

### For Adoption

- **No Learning Curve**: Users don't need to understand multisig
- **No Friction**: No coordination or complex workflows
- **Retail-Friendly**: Designed for individuals, not institutions
- **Scalable**: Works for millions of users

## Comparison

| Feature | Traditional Multisig | ARGUS Invisible Multisig |
|---------|---------------------|-------------------------|
| **User Experience** | Complex, institutional | Simple, retail-friendly |
| **Coordination** | Required | None |
| **Learning Curve** | Steep | None |
| **Transaction Speed** | Slow (coordination) | Fast (automated) |
| **Security** | High | High (on-chain) |
| **Usability** | Poor | Excellent |
| **Adoption** | Institutions only | Everyone |

## Technical Implementation

### Squads V4 Integration

ARGUS leverages Squads Protocol V4 for on-chain multisig:

- **Program ID**: `SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf`
- **Multisig Accounts**: Created on-chain for each Argus Vault
- **Transaction Proposals**: On-chain proposal and approval workflow
- **Execution**: Enforced by smart contract

### Server Co-Signing

The ARGUS server acts as a co-signer that:

- Verifies security layers (voice, location, hardware, etc.)
- Co-signs proposals only if all verifications pass
- Cannot create proposals (requires user signature)
- Cannot bypass security (on-chain enforcement)

**Result**: Server enables security without compromising user sovereignty.

## Key Takeaways

1. **ARGUS makes multisig invisible** to users
2. **Normal wallet experience** with institutional security
3. **On-chain enforcement** via Squads V4
4. **No coordination** required
5. **Retail-friendly** design

ARGUS proves that multisig can be secure, on-chain, and user-friendly—all at the same time.

---

## Next Steps

- **[Multisig Enforcement (Squads V4)](/docs/argus-vault/multisig-enforcement-squads-v4)** - Deep dive into Squads integration
- **[Wallet Architecture Overview](/docs/argus-vault/wallet-architecture-overview)** - Understanding ARGUS architecture
- **[How Argus Vault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - Security mechanisms explained

