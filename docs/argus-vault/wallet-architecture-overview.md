# Wallet Architecture Overview

ARGUS provides a unified wallet interface that supports both standard wallet operations and secure Argus Vault storage, all within a single application.

## Architecture Overview

ARGUS is built as a Chrome extension that provides:

- **Standard Wallet**: Fast, convenient transactions for daily use
- **Argus Vault**: Multi-layer secure storage for high-value holdings
- **Unified Interface**: Seamless switching between wallet types

## Standard Wallet Architecture

The standard wallet operates like a traditional hot wallet:

```
┌──────────────────────────────────────┐
│          Chrome Extension             │
│  ┌────────────────────────────────┐  │
│  │     User Interface (React)     │  │
│  └────────────┬───────────────────┘  │
│               │                       │
│  ┌────────────▼───────────────────┐  │
│  │    Transaction Construction    │  │
│  │       (Solana Web3.js)         │  │
│  └────────────┬───────────────────┘  │
│               │                       │
│  ┌────────────▼───────────────────┐  │
│  │   Encrypted Private Key        │  │
│  │   (chrome.storage.sync)        │  │
│  └────────────┬───────────────────┘  │
│               │                       │
│  ┌────────────▼───────────────────┐  │
│  │    Client-Side Signing         │  │
│  │     (No server involved)       │  │
│  └────────────┬───────────────────┘  │
└───────────────┼───────────────────────┘
                │
                ▼
       Solana Network (RPC)
```

### Key Characteristics

- **Single Keypair**: Standard Solana keypair wallet
- **Client-Side Signing**: All signing happens locally
- **No Server Dependency**: Transactions don't require ARGUS backend
- **Fast**: Instant transaction execution
- **Simple**: Works like any standard wallet

## Argus Vault Architecture

Argus Vault uses Squads V4 multisig with server-side verification:

```
┌──────────────────────────────────────────────────┐
│              Chrome Extension                     │
│  ┌───────────────────────────────────────────┐  │
│  │      User Interface (React)               │  │
│  └───────────────┬───────────────────────────┘  │
│                  │                                │
│  ┌───────────────▼───────────────────────────┐  │
│  │   Create Multisig Proposal                │  │
│  │     (Squads SDK)                          │  │
│  └───────────────┬───────────────────────────┘  │
│                  │                                │
│  ┌───────────────▼───────────────────────────┐  │
│  │   User Signs Proposal                     │  │
│  │   (User wallet signature)                  │  │
│  └───────────────┬───────────────────────────┘  │
└──────────────────┼───────────────────────────────┘
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│              ARGUS Backend Server                 │
│  ┌───────────────────────────────────────────┐  │
│  │   Voice Verification                      │  │
│  │   (MFCC comparison)                       │  │
│  └───────────────┬───────────────────────────┘  │
│                  │                                │
│  ┌───────────────▼───────────────────────────┐  │
│  │   Geographic Verification                 │  │
│  │   (Haversine distance)                    │  │
│  └───────────────┬───────────────────────────┘  │
│                  │                                │
│  ┌───────────────▼───────────────────────────┐  │
│  │   Hardware/Bluetooth/Biometric Checks     │  │
│  └───────────────┬───────────────────────────┘  │
│                  │                                │
│  ┌───────────────▼───────────────────────────┐  │
│  │   Server Co-Signs Proposal                │  │
│  │   (If all verifications pass)             │  │
│  └───────────────┬───────────────────────────┘  │
└──────────────────┼───────────────────────────────┘
                   │
                   ▼
          Solana Network (RPC)
                   │
                   ▼
┌──────────────────────────────────────────────────┐
│           Squads V4 Smart Contract                │
│  ┌───────────────────────────────────────────┐  │
│  │   Verify 2-of-2 signatures present        │  │
│  └───────────────┬───────────────────────────┘  │
│                  │                                │
│  ┌───────────────▼───────────────────────────┐  │
│  │   Execute transaction from Vault PDA      │  │
│  └───────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘
```

### Key Characteristics

- **Multisig Account**: Squads V4 multisig (2-of-2)
- **Server Co-Signing**: ARGUS backend verifies security layers
- **On-Chain Enforcement**: Squads smart contract enforces rules
- **Secure**: Multiple independent security layers
- **Flexible**: Configurable security based on needs

## Unified User Experience

Despite architectural differences, ARGUS presents a seamless interface:

### Wallet Selector

Users can switch between wallet types easily:

```
┌─────────────────────────┐
│  ▼ Wallet      SOL  │  ← Dropdown selector
├─────────────────────────┤
│  ○ Standard Wallet      │
│  ◉ Argus Vault            │  ← Switch between wallets
└─────────────────────────┘
```

### Transaction Interface

Both wallets use the same UI flow:

1. Select token
2. Enter recipient and amount
3. Review transaction
4. Approve (different verification based on wallet type)

The user doesn't need to understand the underlying architecture—ARGUS handles the complexity.

### Balance Display

Users see balances for both wallet types:

```
┌─────────────────────────────────┐
│  Standard Wallet    Argus Vault    │
│  ◉ 0.5 SOL         ○ 100 SOL   │
│  $65 USD           $13,000 USD │
└─────────────────────────────────┘
```

## Technical Stack

### Frontend

- **Framework**: React + TypeScript
- **Platform**: Chrome Extension (Plasmo)
- **Blockchain**: Solana Web3.js
- **Multisig**: Squads SDK

### Backend

- **Runtime**: Node.js + Express
- **Database**: PostgreSQL (Prisma ORM)
- **Security**: Voice verification, geographic checks
- **Blockchain**: Solana RPC integration

### On-Chain

- **Multisig**: Squads Protocol V4
- **Program ID**: `SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf`
- **Enforcement**: Smart contract-based

## Data Flow

### Standard Wallet Transaction

```
User → UI → Transaction Construction → Sign (local) → Broadcast → Solana Network
```

**Time**: < 2 seconds
**Server**: Not required

### Argus Vault Transaction

```
User → UI → Proposal Creation → Sign (local) → Server Verification → 
Server Co-Sign → Execute → Solana Network → Squads V4
```

**Time**: 30-60 seconds
**Server**: Required for verification

## Security Architecture

### Standard Wallet

- **Encryption**: AES-256-GCM
- **Storage**: Chrome storage (encrypted at rest)
- **Signing**: Client-side only
- **Protection**: Password-based

### Argus Vault

- **Multisig**: 2-of-2 (user + server)
- **Verification**: Multiple independent layers
- **Enforcement**: On-chain via Squads V4
- **Protection**: Multi-layer defense-in-depth

## Key Takeaways

1. **Unified Interface**: Single application, multiple security levels
2. **Flexible Architecture**: Standard wallet for speed, Argus Vault for security
3. **Invisible Multisig**: Users don't see multisig complexity
4. **On-Chain Enforcement**: Security exists independently of infrastructure
5. **User-Friendly**: Complex security made simple

ARGUS architecture provides the flexibility to choose security level while maintaining a simple, unified user experience.

---

## Next Steps

- **[How Argus Vault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - Deep dive into security mechanisms
- **[Multisig Enforcement](/docs/argus-vault/multisig-enforcement-squads-v4)** - Understanding Squads V4 integration
- **[Security Layers](/docs/argus-vault/security-layers)** - All security options explained

