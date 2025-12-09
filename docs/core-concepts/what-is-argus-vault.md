# What Is a Argus Vault

The **Argus Vault** is the core security primitive of ARGUS.

A Argus Vault is a protected wallet vault where **every transaction requires both**:

1. A valid cryptographic signature
2. Real-time verification of the user's physical and environmental context

This means that even if an attacker steals your private key or seed phrase, **the key alone is not enough** to move funds.

## The Fundamental Difference

### Traditional Wallet

```
Private Key → Signature → Transaction Executes
```

**Problem**: Key alone is sufficient. If compromised, funds are immediately accessible.

### Argus Vault

```
Private Key + Location + Voice + Hardware + Environment → All Verified → Transaction Executes
```

**Solution**: Key is necessary but not sufficient. Multiple independent layers must all pass.

## Geo-Fenced Transaction Approvals

With ARGUS Wallet v1.0.1, Argus Vaults introduce **geo-signature protected transactions**.

When a Argus Vault is active:

- Transactions can only be approved from locations you explicitly trust
- Approval fails immediately if the request originates outside your geofence
- Distance matters — being thousands of kilometers away is an automatic rejection

**Wrong place. No signature.**

This security layer is live, functional, and designed for real-world use.

## Breaking the Modern Attack Path

Most large wallet thefts today follow the same path:

- Social engineering
- Malware or remote access
- Seed phrase or key exfiltration
- Immediate draining of funds

The reason this works is simple: **traditional wallets trust the key completely**.

ARGUS breaks this attack path.

With a Argus Vault:

- A valid key is necessary but not sufficient
- The attacker must also match your physical location
- They must be using an authorized device
- They must pass live environmental verification

A remote attacker — regardless of how the key was obtained — fails instantly.

There is no reuse of old proofs.

There is no replay.

There is no bypass.

Every transaction requires fresh, real-time approval tied to the real world.

## How Argus Vault Works

### Architecture

A Argus Vault is **not a traditional wallet**—it's a **Squads Protocol V4 multisig account** that requires multiple security verifications to approve transactions:

1. **Your Signature**: You create and sign transaction proposals
2. **Server Approval**: ARGUS backend verifies security layers and co-signs
3. **On-Chain Execution**: Transaction executes via Squads smart contract

### Security Layers

Each Argus Vault can be configured with multiple independent security layers:

#### Required Layers

- **Voice Biometrics**: Your unique voice print serves as a biometric signature
- **Geographic Verification**: Transactions only approved from registered locations

#### Optional Layers

- **Hardware Keys**: USB security keys for physical authentication
- **Bluetooth Devices**: Proximity verification via trusted devices
- **Platform Biometrics**: Fingerprint, Face ID, Windows Hello

### Transaction Flow

```
User initiates transaction
    ↓
Create multisig proposal (on-chain)
    ↓
User signs proposal
    ↓
Security verification begins:
  - Voice biometric check
  - Geographic location check
  - Hardware key check (if enabled)
  - Bluetooth device check (if enabled)
  - Platform biometric check (if enabled)
    ↓
All verifications pass
    ↓
Server co-signs proposal
    ↓
Transaction executes on-chain
    ↓
Funds transferred
```

## Security Guarantees

Even if an attacker obtains your private key, they **cannot** drain your Argus Vault funds without:

- Replicating your voice biometrics
- Being physically present at your registered location
- Possessing your registered hardware security key
- Having access to your registered Bluetooth device
- Bypassing your platform biometric authentication

This multi-layered approach creates defense-in-depth that makes unauthorized access virtually impossible.

## Creating Your Argus Vault

Creating a Argus Vault is the moment you leave single-key security behind.

Once your Argus Vault is active:

- Your assets are no longer drainable with a stolen seed phrase
- Transactions require context, not just credentials
- Your wallet becomes environment-aware and physically enforced

ARGUS shifts self-custody from **key-based trust** to **reality-based security**.

## Use Cases

### Long-Term Holdings

Argus Vault is ideal for assets you don't need frequent access to:

- Life savings in crypto
- Large investments
- Emergency funds
- Retirement holdings

### High-Value Assets

For significant amounts, Argus Vault provides maximum protection:

- Protection against remote attacks
- Multiple independent security layers
- On-chain multisig enforcement
- Geographic binding

### Compliance Requirements

For organizations requiring geographic restrictions:

- Transactions only from authorized locations
- Audit trail via on-chain multisig
- Configurable security policies
- Regulatory compliance support

## Comparison to Other Solutions

| Solution | Security Model | Remote Attack Protection | Usability |
|----------|---------------|-------------------------|-----------|
| **Hot Wallet** | Single key | None | Excellent |
| **Hardware Wallet** | Key on device | Good | Fair |
| **Traditional Multisig** | Multiple keys | Good | Poor |
| **Argus Vault** | Key + Context | Excellent | Good |

## Key Takeaways

1. **Argus Vault is the core security primitive** of ARGUS
2. **Requires both key and context** for transactions
3. **Breaks the modern attack path** by requiring physical presence
4. **Multiple independent layers** provide defense-in-depth
5. **On-chain enforcement** via Squads V4 multisig

Argus Vault represents a fundamental shift from key-based to context-based security.

---

## Next Steps

- **[How Argus Vault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - Deep dive into security mechanisms
- **[Security Layers](/docs/argus-vault/security-layers)** - Understanding each security layer
- **[Getting Started: Argus Vault Setup](/docs/getting-started/geo-vault-setup)** - Set up your Argus Vault

