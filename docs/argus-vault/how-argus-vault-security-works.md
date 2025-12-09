# How Argus Vault Security Works

<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem', margin: '2rem 0', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', border: '3px solid #10b981', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'}}>
  <video
    controls
    autoPlay
    muted
    loop
    style={{width: '100%', maxWidth: '1200px', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}
  >
    <source src="/img/geo_vault_protection.MP4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

Argus Vault security operates through multiple independent layers that all must pass before any transaction can execute. This defense-in-depth approach makes unauthorized access virtually impossible.

## The Security Model

Argus Vault uses a **multi-layer security model** where each layer is independent and must pass:

```
Transaction Request
    ↓
Layer 1: Cryptographic Signature (Private Key)
    ↓
Layer 2: Geographic Verification (Location)
    ↓
Layer 3: Voice Biometrics (Identity)
    ↓
Layer 4: Hardware Keys (Physical Device)
    ↓
Layer 5: Bluetooth Devices (Proximity)
    ↓
Layer 6: Platform Biometrics (Device Authentication)
    ↓
All Layers Pass → Server Co-Signs → Transaction Executes
```

## The Transaction Flow

### Step 1: Transaction Initiation

User initiates a transaction from Argus Vault:

1. Select token and amount
2. Enter recipient address
3. Review transaction details
4. Click "Send"

### Step 2: Multisig Proposal Creation

ARGUS creates a Squads V4 multisig proposal on-chain:

1. Transaction proposal created
2. User's wallet key signs the proposal
3. Proposal status: "Active" (waiting for co-signer)

### Step 3: Security Verification

ARGUS backend verifies all configured security layers:

#### Geographic Verification
- GPS coordinates captured
- Distance calculated from geo-fence center
- Verification: Within authorized radius?

#### Voice Biometric Verification
- Voice sample recorded
- MFCC features extracted
- Compared against enrolled fingerprint
- Verification: Confidence ≥ 75%?

#### Hardware Key Verification
- USB device presence checked
- Device ID verified against registered devices
- Verification: Authorized device present?

#### Bluetooth Device Verification
- Bluetooth device proximity checked
- Device ID verified against registered devices
- Verification: Authorized device nearby?

#### Platform Biometric Verification
- WebAuthn challenge issued
- Biometric authentication provided
- Verification: Biometric signature valid?

### Step 4: Server Co-Signing

If **all** verifications pass:

1. ARGUS server co-signs the proposal
2. Proposal now has 2-of-2 signatures
3. Transaction ready to execute

If **any** verification fails:

1. Server rejects the proposal
2. Transaction fails
3. User notified of failure reason

### Step 5: Transaction Execution

Once both signatures are present:

1. Transaction executes via Squads V4
2. Funds transferred from vault
3. Transaction confirmed on-chain
4. User sees success notification

## Security Guarantees

### What Each Layer Protects Against

#### Cryptographic Signature (Layer 1)
- **Protects**: Proves ownership of funds
- **Vulnerable To**: Key theft, key compromise
- **Mitigation**: Additional layers required

#### Geographic Verification (Layer 2)
- **Protects**: Remote attacks, key theft from distance
- **Vulnerable To**: Physical presence at location
- **Mitigation**: Requires attacker to be physically present

#### Voice Biometrics (Layer 3)
- **Protects**: Unauthorized use of stolen key
- **Vulnerable To**: Voice synthesis (with detection)
- **Mitigation**: Advanced synthesis detection algorithms

#### Hardware Keys (Layer 4)
- **Protects**: Unauthorized device access
- **Vulnerable To**: Physical theft of device
- **Mitigation**: Multiple devices can be registered

#### Bluetooth Devices (Layer 5)
- **Protects**: Unauthorized proximity access
- **Vulnerable To**: Physical theft of device
- **Mitigation**: Multiple devices can be registered

#### Platform Biometrics (Layer 6)
- **Protects**: Unauthorized device access
- **Vulnerable To**: Physical device compromise
- **Mitigation**: Hardware-backed security (TPM/Secure Enclave)

### Combined Protection

Together, these layers create defense-in-depth:

- **Single Layer Compromise**: Other layers remain active
- **Multiple Layer Requirement**: Attacker must compromise multiple independent systems
- **Real-World Binding**: Physical presence and devices required
- **On-Chain Enforcement**: Security exists independently of ARGUS infrastructure

## Attack Scenarios

### Scenario 1: Stolen Private Key

**Attack**: Attacker obtains user's private key through phishing or malware.

**Argus Vault Response**:
1. Attacker creates transaction proposal ✓ (allowed)
2. Attacker signs proposal ✓ (allowed)
3. Geographic verification ❌ (attacker not at location)
4. Transaction rejected

**Result**: Attack fails. Key alone is insufficient.

### Scenario 2: Voice Synthesis

**Attack**: Attacker uses AI to synthesize user's voice.

**Argus Vault Response**:
1. Voice sample recorded
2. Synthesis detection algorithms analyze sample
3. Unnatural frequency patterns detected
4. Verification fails

**Result**: Attack fails. Synthesis detection prevents bypass.

### Scenario 3: GPS Spoofing

**Attack**: Attacker attempts to spoof GPS coordinates.

**Argus Vault Response**:
1. Multiple location data sources checked
2. Consistency checks performed
3. VPN/proxy detection active
4. Spoofing detected

**Result**: Attack fails. Multiple verification methods prevent spoofing.

### Scenario 4: Physical Coercion

**Attack**: Attacker physically threatens user to approve transaction.

**Argus Vault Response**:
- All security layers can be passed if user is coerced
- This is a limitation of any system
- Mitigation: Duress features (planned)

**Result**: Limited protection (inherent limitation).

## Security Configuration

### Minimum Configuration

All Argus Vaults must have voice biometrics enrolled and geographic verification configured. This provides strong protection against remote attacks.

### Recommended Configuration

For maximum security, enable voice biometrics, configure geographic verification, register one to two hardware keys, pair one to two Bluetooth devices, and enable platform biometrics.

This creates five independent barriers.

### Advanced Configuration

Power users can add:
- Multiple hardware keys (primary + backups)
- Multiple Bluetooth devices (phone + watch)
- Multiple geo-fences (different vaults per location)
- Time-based restrictions (planned)
- Transaction amount limits (planned)

## Key Takeaways

1. **Multiple independent layers** provide defense-in-depth
2. **All layers must pass** for transaction approval
3. **Real-world binding** makes remote attacks impossible
4. **On-chain enforcement** via Squads V4 multisig
5. **Configurable security** based on user needs

Argus Vault security works by requiring multiple independent verifications, making unauthorized access virtually impossible.

---

## Next Steps

- **[Security Layers](/docs/argus-vault/security-layers)** - Deep dive into each security layer
- **[Multisig Enforcement](/docs/argus-vault/multisig-enforcement-squads-v4)** - How Squads V4 enforces security
- **[Wallet Architecture Overview](/docs/argus-vault/wallet-architecture-overview)** - Understanding the complete system

