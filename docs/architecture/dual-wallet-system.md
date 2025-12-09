# Wallet Architecture

ARGUS is a wallet that provides flexible security options for different use cases. While ARGUS uses invisible multisig infrastructure under the hood, users can organize their assets across different security configurations within a single wallet interface.

## The Problem with Traditional Wallets

Traditional cryptocurrency wallets force users to choose between two extremes:

### Hot Wallets (Convenience)
**Examples**: MetaMask, Phantom, Solflare

**Advantages**:
- ✅ Instant access to funds
- ✅ Quick transaction signing
- ✅ Seamless DApp integration
- ✅ Easy to use

**Vulnerabilities**:
- ❌ Private keys stored on internet-connected devices
- ❌ Vulnerable to phishing attacks
- ❌ Malware can exfiltrate keys
- ❌ No protection against remote attacks
- ❌ Single point of failure

### Cold Wallets (Security)
**Examples**: Ledger, Trezor, Paper Wallets

**Advantages**:
- ✅ Private keys never touch internet
- ✅ Protected from remote attacks
- ✅ Resistant to malware
- ✅ Physical security

**Vulnerabilities**:
- ❌ Inconvenient for daily use
- ❌ Slow transaction process
- ❌ Poor DApp integration
- ❌ Risk of physical loss/damage
- ❌ High friction deters usage

## ARGUS Wallet Structure

ARGUS provides flexible security configurations within a single wallet interface, allowing you to optimize for your specific use case.

```
┌─────────────────────────────────────────────────────┐
│                  ARGUS WALLET                        │
├──────────────────────────┬──────────────────────────┤
│   Standard Wallet        │       Argus Vault            │
│   (Standard Security)    │    (Multi-Layer Security) │
├──────────────────────────┼──────────────────────────┤
│  • Instant access        │  • Multi-sig security    │
│  • Password only         │  • Voice biometrics      │
│  • DApp integration      │  • Geographic fence      │
│  • Quick transactions    │  • Hardware keys         │
│  • 1-5% holdings         │  • 95-99% holdings       │
└──────────────────────────┴──────────────────────────┘
```

## Standard Wallet

### Overview

The standard wallet in ARGUS is a **standard Solana keypair wallet** that operates like traditional cryptocurrency wallets. It's your everyday spending wallet, providing convenience for frequent transactions.

### Technical Details

**Key Generation**:
```typescript
// Generated using Solana's standard keypair generation
const masterKeypair = Keypair.generate();

// Or derived from BIP39 mnemonic
const seed = await bip39.mnemonicToSeed(mnemonic);
const masterKeypair = Keypair.fromSeed(seed.slice(0, 32));
```

**Storage**:
- Private key encrypted with user password (AES-256-GCM)
- Stored in Chrome's `chrome.storage.sync` (encrypted at rest)
- Synchronized across user's Chrome installations
- Never transmitted to ARGUS servers

**Transaction Flow**:
```
User clicks "Send" 
    ↓
Enter amount & recipient
    ↓
Review transaction
    ↓
Enter password
    ↓
Decrypt private key (client-side)
    ↓
Sign transaction (client-side)
    ↓
Broadcast to Solana network
    ↓
Confirmed in ~500ms
```

### Use Cases

**Ideal For**:
- Daily spending (coffee, purchases, tips)
- DeFi protocols (lending, farming, swapping)
- NFT minting and trading
- DApp interactions
- Testing and development
- Airdrops and faucets

**Recommended Balance**:
- 1-5% of total portfolio
- Enough for 1-2 weeks of transactions
- Amount you're comfortable risking

**Security Profile**:
- Single-factor authentication (password)
- Client-side key storage
- Equivalent to MetaMask/Phantom security
- Fast and convenient

### Security Considerations

**Protected Against**:
- ✅ Unauthorized access (password required)
- ✅ Key exfiltration from ARGUS servers (keys never leave device)
- ✅ Plaintext storage (AES-256 encryption)

**Vulnerable To**:
- ❌ Malware on infected computer
- ❌ Phishing if password compromised
- ❌ Physical access + password breach
- ❌ Browser extension vulnerabilities

**Mitigation**: Keep only small amounts in your standard wallet. Move large holdings to Argus Vault.

## Argus Vault: Multi-Layer Security

### Overview

The Argus Vault is the core security primitive of ARGUS. It's a **Squads Protocol V4 multisig account** that requires multiple independent security verifications to approve any transaction. Every transaction requires both a valid cryptographic signature and real-time verification of physical and environmental context.

### Technical Details

**Structure**:
```typescript
// Squads V4 multisig with 2-of-2 threshold
Multisig Members:
  - Member 1: User's wallet key (signer)
  - Member 2: ARGUS Backend Server (co-signer)

Threshold: 2 of 2 (both signatures required)

Program: SQDS4ep65T869zMMBKyuUq6aD6EgTu8psMjkvj52pCf
```

**PDA Derivation**:
```typescript
// Multisig PDA
const [multisigPDA] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("multisig"),
    createKey.publicKey.toBuffer(),
    Buffer.from("ARGUS"),
  ],
  SQUADS_PROGRAM_ID
);

// Vault PDA (holds actual funds)
const [vaultPDA] = PublicKey.findProgramAddressSync(
  [
    Buffer.from("vault"),
    multisigPDA.toBuffer(),
    new Uint8Array([vaultIndex]),
  ],
  SQUADS_PROGRAM_ID
);
```

**Transaction Flow**:
```
User initiates transfer
    ↓
Create VaultTransaction proposal (on-chain)
    ↓
User signs proposal creation
    ↓
Security Layer 1: Voice Verification
    ↓
Security Layer 2: Geographic Verification
    ↓
Security Layer 3: Hardware Key (optional)
    ↓
Security Layer 4: Bluetooth Device (optional)
    ↓
Security Layer 5: Biometric (optional)
    ↓
All verifications passed
    ↓
Server co-signs proposal
    ↓
Execute transaction via Squads
    ↓
Confirmed on-chain
```

### Use Cases

**Ideal For**:
- Long-term holdings (HODL)
- Life savings in crypto
- Large investments
- Emergency funds
- Assets you rarely need to access
- Compliance-required storage
- Multi-party treasury funds

**Recommended Balance**:
- 95-99% of total portfolio
- Assets you don't need daily/weekly access to
- Maximum security priority

**Security Profile**:
- Multi-factor authentication (5 layers possible)
- On-chain multisig with server co-signer
- Geographic binding to physical location
- Biometric verification
- Hardware security keys
- Enterprise-grade protection

### Security Layers

Each layer is **independent** and provides defense-in-depth:

| Layer | Type | Requirement | Bypass Difficulty |
|-------|------|-------------|-------------------|
| Voice | Biometric | Record voice sample | Very High (voice synthesis detection) |
| Location | Geographic | Be at geo-fence location | Impossible remotely |
| Hardware | Physical | Connect registered USB device | High (requires physical theft) |
| Bluetooth | Proximity | Registered device nearby | High (requires physical theft) |
| Biometric | Platform | Fingerprint/Face ID | High (requires physical presence) |

**Combined Security**: To compromise a Argus Vault, an attacker needs:
1. Your private key (seed phrase)
2. Your voice recording (good quality)
3. Physical presence at your location
4. Your hardware security key
5. Your bluetooth device
6. Your fingerprint/face

This makes unauthorized access **practically impossible** even with sophisticated resources.

## Architectural Comparison

### Standard Wallet Architecture

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

### Argus Vault Architecture

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

## Unified User Experience

Despite the architectural differences, ARGUS presents a **seamless, unified interface**:

### Wallet Selector
```
┌─────────────────────────┐
│  ▼ Wallet      SOL  │  ← Dropdown selector
├─────────────────────────┤
│  ○ Standard Wallet            │
│  ◉ Argus Vault             │  ← Switch between wallets
└─────────────────────────┘
```

### Transaction Interface
Both wallets use the **same UI flow**:
1. Select token
2. Enter recipient and amount
3. Review transaction
4. Approve (different verification based on wallet type)

The user doesn't need to understand the underlying architecture—ARGUS handles the complexity.

### Balance Display
```
┌─────────────────────────────────┐
│  Standard Wallet         Argus Vault   │
│  ◉ 0.5 SOL          ○ 100 SOL   │  ← Quick balance view
│  $65 USD            $13,000 USD │
└─────────────────────────────────┘
```

## Best Practices

### Fund Allocation Strategy

**Conservative** (Maximum Security):
- Standard Wallet: 1% (~1 week of spending)
- Argus Vault: 99% (long-term holdings)

**Balanced** (Security + Convenience):
- Standard Wallet: 5% (active trading, DeFi)
- Argus Vault: 95% (long-term holdings)

**Aggressive** (Active Trading):
- Standard Wallet: 10-15% (frequent transactions)
- Argus Vault: 85-90% (core holdings)

### Transaction Patterns

**Standard Wallet Usage**:
- Frequency: Daily to weekly
- Amount: Small to medium (less than $1000)
- Speed: Instant (under 2 seconds)
- Verification: Password only

**Argus Vault Usage**:
- Frequency: Monthly to yearly
- Amount: Large (over $1000)
- Speed: Slower (30-60 seconds)
- Verification: Full security stack

### Security Recommendations

1. **Never keep all funds in standard wallet**
   - Even if you trust your security, accidents happen
   - Malware, phishing, and attacks target standard wallets

2. **Test Argus Vault before large transfers**
   - Send 0.01 SOL test transaction
   - Verify all security layers work
   - Confirm you can access when needed

3. **Keep standard wallet funded**
   - Always maintain enough SOL for fees
   - Minimum: 0.01 SOL
   - Recommended: 0.05-0.1 SOL

4. **Regular rebalancing**
   - Weekly: Check if standard wallet needs refilling
   - Monthly: Review allocation percentages
   - Quarterly: Audit transaction patterns

5. **Separate concerns**
   - Standard Wallet: Working capital
   - Argus Vault: Savings/investment capital
   - Think like checking vs. savings account

## Internal Transfers

Transferring between your own wallets is seamless and recognized by ARGUS:

### Standard Wallet → Argus Vault
```
1. Select standard wallet
2. Click Send
3. Paste Argus Vault address
4. ARGUS shows "↑ Sending to your Argus Vault"
5. Enter amount
6. Confirm with password
7. Complete in seconds
```

### Argus Vault → Standard Wallet
```
1. Select Argus Vault
2. Click Send
3. Paste standard wallet address
4. ARGUS shows "↓ Sending to your wallet"
5. Enter amount
6. Complete security verifications
7. Transaction approved and executed
```

**Special Features**:
- Auto-detection of your own addresses
- Special icons for internal transfers
- No confusion about which wallet you're sending to
- Transaction history shows internal transfers clearly

## Advanced: Multiple Argus Vaults

Power users can create multiple Argus Vaults for different purposes:

### Use Case: Geographic Distribution
```
┌───────────────────────┐
│  Standard Wallet      │  1% - Daily spending
├───────────────────────┤
│  Home Argus Vault        │  50% - Personal savings
├───────────────────────┤
│  Office Argus Vault      │  30% - Business funds
├───────────────────────┤
│  Travel Argus Vault      │  19% - Accessible globally
└───────────────────────┘
```

### Use Case: Asset Segregation
```
┌───────────────────────┐
│  Standard Wallet      │  Trading capital
├───────────────────────┤
│  SOL Argus Vault         │  Long-term SOL holdings
├───────────────────────┤
│  Stablecoin Argus Vault  │  USDC savings
├───────────────────────┤
│  Governance Argus Vault  │  $ARGUS staking
└───────────────────────┘
```

Each Argus Vault has:
- Independent security configuration
- Different geographic locations
- Separate transaction history
- Unique multisig structure

## Technical Implementation

### Wallet State Management

**Chrome Storage Structure**:
```typescript
interface WalletStorage {
  // Standard Wallet
  walletKeyEncrypted: string;        // AES-256-GCM encrypted
  walletKeyPublic: string;            // Public key (not sensitive)
  
  // Argus Vaults (array for multiple vaults)
  argusVaults: Array<{
    multisigAddress: string;          // Squads multisig PDA
    vaultAddress: string;             // Vault PDA (holds funds)
    name: string;                     // User-defined name
    createdAt: number;                // Timestamp
    securityConfig: {                 // Active security layers
      voice: boolean;
      geofence: boolean;
      hardwareKey: boolean;
      bluetooth: boolean;
      biometric: boolean;
    };
  }>;
  
  // Active wallet selection
  activeWallet: 'masterKey' | string; // or Argus Vault address
}
```

### Balance Fetching

**Standard Wallet**:
```typescript
// Direct RPC call
const balance = await connection.getBalance(walletPublic);

// SPL tokens
const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
  walletPublic,
  { programId: TOKEN_PROGRAM_ID }
);
```

**Argus Vault**:
```typescript
// Query vault PDA balance
const balance = await connection.getBalance(vaultPDA);

// SPL tokens in vault
const tokenAccounts = await connection.getParsedTokenAccountsByOwner(
  vaultPDA,
  { programId: TOKEN_PROGRAM_ID }
);
```

### Real-Time Updates

Both wallets subscribe to WebSocket updates:

```typescript
// Subscribe to account changes
connection.onAccountChange(
  walletAddress,
  (accountInfo) => {
    // Update UI with new balance
    updateBalance(accountInfo.lamports);
  },
  'confirmed'
);
```

## Conclusion

ARGUS provides flexible security configurations within a single wallet interface. The standard wallet offers convenience for daily use, while Argus Vault provides multi-layer security for long-term holdings.

**Key Takeaways**:
- Standard Wallet: Fast, convenient, for daily use (1-5% holdings)
- Argus Vault: Secure, multi-layered, for savings (95-99% holdings)
- Unified interface: Seamless switching between wallets
- Independent security: Compromise of one doesn't affect the other
- Flexible allocation: Users choose their own risk/convenience balance

## Next Steps

- **[Squads Integration](/docs/architecture/squads-integration)** - Deep dive into multisig implementation
- **[Security Model](/docs/architecture/security-model)** - Understanding the defense layers
- **[Transaction Flow](/docs/architecture/transaction-flow)** - How transactions work end-to-end

---

**Two wallets, one unified experience. Security without compromise.**

