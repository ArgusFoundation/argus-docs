# Argus Vault Setup

## What Is the ARGUS Argus Vault

The **Argus Vault** is the core security primitive of ARGUS.

A Argus Vault is a protected wallet vault where **every transaction requires both**:

1. A valid cryptographic signature
2. Real-time verification of the user's physical and environmental context

This means that even if an attacker steals your private key or seed phrase, **the key alone is not enough** to move funds.

The Argus Vault enforces multiple independent approval layers before allowing any value to leave.

---

## Geo-Fenced Transaction Approvals

With ARGUS Wallet v1.0.1, Argus Vaults introduce **geo-signature protected transactions**.

When a Argus Vault is active:

- Transactions can only be approved from locations you explicitly trust
- Approval fails immediately if the request originates outside your geofence
- Distance matters — being thousands of kilometers away is an automatic rejection

**Wrong place. No signature.**

This security layer is live, functional, and designed for real-world use.

---

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

---

## Creating Your Argus Vault

<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem', margin: '2rem 0', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', border: '3px solid #10b981', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'}}>
  <video
    controls
    autoPlay
    muted
    loop
    style={{width: '100%', maxWidth: '1200px', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}
  >
    <source src="/img/geo_vault.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

Creating a Argus Vault is the moment you leave single-key security behind.

Once your Argus Vault is active:

- Your assets are no longer drainable with a stolen seed phrase
- Transactions require context, not just credentials
- Your wallet becomes environment-aware and physically enforced

ARGUS shifts self-custody from **key-based trust** to **reality-based security**.

---

## Prerequisites

Before creating your Argus Vault, ensure:

- ARGUS wallet is installed and funded with at least 0.05 SOL (for rent and fees)
- Browser has microphone access permission
- Location services are enabled
- You're at a location you control (home, office, etc.)
- Stable internet connection

## Understanding Argus Vault Architecture

### What is a Argus Vault?

A Argus Vault is **not** a traditional wallet—it's a **Squads Protocol V4 multisig account** that requires multiple security verifications to approve transactions:

1. **Your Signature**: You create and sign transaction proposals
2. **Server Approval**: ARGUS backend verifies security layers and co-signs
3. **On-Chain Execution**: Transaction executes via Squads smart contract

### Security Architecture

```
┌─────────────────────────────────────────────┐
│           Argus Vault Transaction              │
└─────────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        ▼                         ▼
   User Signs              Server Verifies
   Proposal               Security Layers
        │                         │
        │            ┌────────────┼────────────┐
        │            ▼            ▼            ▼
        │         Voice       Location    Hardware
        │       Biometric     Geo-Fence    Keys
        │            │            │            │
        └────────────┴────────────┴────────────┘
                     │
                     ▼
           Transaction Approved
                     │
                     ▼
          Executed via Squads V4
```

### Attack Vector Protection

| Attack Type | Protected? | How |
|-------------|-----------|-----|
| Remote Private Key Theft | Yes | Geographic verification requires physical presence |
| SIM Swapping | Yes | No SMS dependency, voice + location required |
| Phishing | Yes | Multi-layer verification prevents blind signing |
| Malware | Yes | Hardware key + voice + location all required |
| Social Engineering | Yes | Multiple independent factors needed |
| Physical Coercion* | Partial | Physical coercion always a risk (use duress features) |

*_No cryptocurrency solution can fully protect against physical coercion._

## Step-by-Step Setup

### Step 1: Initiate Argus Vault Creation

1. **Open ARGUS Wallet**
   - Click the ARGUS icon in Chrome toolbar
   - Ensure you have at least 0.05 SOL in Master Key

2. **Navigate to Vault Creation**
   - Click **Settings** (gear icon)
   - Select **Security**
   - Click **Create Argus Vault** button

3. **Review Information**
   - Read the Argus Vault introduction
   - Understand the security model
   - Click **Begin Setup**

### Step 2: Configure Geographic Fence

Geographic fencing is the cornerstone of ARGUS security. Your transactions can only be approved from within a defined physical area.

1. **Grant Location Permission**
   - Browser prompts for location access
   - Click **Allow** (this is required for Argus Vault)
   - ARGUS captures your current GPS coordinates

2. **Set Geo-Fence Center**
   - Your current location becomes the center point
   - Coordinates displayed: `Lat: XX.XXXX, Lon: XX.XXXX`
   - Accuracy shown: typically 5-50 meters

3. **Configure Radius** (Optional)
   - Default: 500 meters (0.31 miles)
   - Minimum: 100 meters
   - Maximum: 5,000 meters
   - Recommendation: 200-500m for home, 1000m for office

4. **Visualize Geo-Fence**
   - Map shows your geo-fence area
   - Verify it covers your desired area
   - Adjust radius if needed

:::tip Choosing Geo-Fence Location
- **Home**: Ideal for personal long-term holdings
- **Office**: Good for business/organizational funds
- **Multiple Locations**: Create separate Argus Vaults for different locations
- **Avoid**: Public places, airports, temporary locations
:::

### Step 3: Enroll Voice Biometrics

Your unique voice print becomes a biometric signature for transaction approval.

1. **Prepare for Recording**
   - Find a quiet environment
   - Ensure microphone is working
   - Click **Start Voice Enrollment**

2. **Grant Microphone Permission**
   - Browser prompts for microphone access
   - Click **Allow** (required for voice biometrics)

3. **Record Voice Sample**
   - Passphrase appears on screen:
     ```
     "ARGUS secure wallet transaction approval 
     for Solana blockchain authentication"
     ```
   - Click **Start Recording**
   - Read the passphrase naturally (15-20 seconds)
   - Speak clearly at normal volume
   - Click **Stop Recording** when complete

4. **Processing**
   - Audio is uploaded to ARGUS server
   - MFCC (Mel-frequency cepstral coefficients) extracted
   - Voice fingerprint generated
   - Fingerprint stored (audio is discarded)

5. **Verification Test**
   - Record a second sample immediately
   - System verifies match (over 75% confidence required)
   - Success confirmation appears

:::warning Voice Recording Best Practices
- **Do**: Speak naturally, use consistent environment, normal volume
- **Don't**: Whisper, shout, use synthetic voice, have background music
- **Environment**: Quiet room minimizes false rejections
- **Consistency**: Recording environment should match verification environment
:::

### Step 4: Configure Hardware Security Keys (Optional but Recommended)

Add a physical hardware key for an additional security layer.

#### Supported Devices
- YubiKey (all models)
- Ledger hardware wallets
- Trezor
- Any USB security key
- Generic USB devices (used as presence tokens)

#### Registration Process

1. **Connect Hardware Key**
   - Plug USB device into your computer
   - Ensure device is recognized by OS

2. **Initiate Pairing**
   - Click **Add Hardware Key** in setup wizard
   - ARGUS requests USB device access

3. **Select Device**
   - Browser shows USB device picker
   - Select your security key from list
   - Click **Connect**

4. **Device Registered**
   - Vendor ID and Product ID stored
   - Device name shown in security settings
   - ✓ Hardware layer activated

5. **Test Authentication**
   - Click **Test Hardware Key**
   - Browser prompts for device selection
   - Select your registered device
   - Success confirmation

:::info Multiple Hardware Keys
You can register multiple hardware keys as backups. During verification, any registered device will work. This prevents lockout if one device is lost or damaged.
:::

### Step 5: Configure Bluetooth Device Proximity (Optional)

Use your smartphone, smartwatch, or other Bluetooth device as a proximity-based security factor.

#### Supported Devices
- Smartphones (iOS, Android)
- Smartwatches (Apple Watch, Samsung Galaxy Watch, etc.)
- Fitness trackers with Bluetooth
- Bluetooth headphones (unique identifiers)
- Any discoverable Bluetooth device

#### Registration Process

1. **Prepare Bluetooth Device**
   - Enable Bluetooth on your device
   - Make device **discoverable**
   - Keep device nearby (within 10 meters)

2. **Initiate Pairing**
   - Click **Add Bluetooth Device** in setup wizard
   - ARGUS requests Bluetooth access

3. **Grant Bluetooth Permission**
   - Browser prompts for Bluetooth access
   - Click **Allow**

4. **Select Device**
   - Browser shows nearby Bluetooth devices
   - Select your trusted device
   - Click **Pair**

5. **Device Registered**
   - Device name and ID stored
   - Connection confirmed
   - ✓ Bluetooth layer activated

6. **Test Proximity**
   - Click **Test Bluetooth Device**
   - Ensure device is nearby and discoverable
   - Connection attempt succeeds
   - Success confirmation

:::tip Bluetooth Device Selection
- **Smartphone**: Always with you, reliable
- **Smartwatch**: Convenient, worn on body
- **Headphones**: Works but may not always be nearby
- **Backup Device**: Register a second device in case primary is unavailable
:::

### Step 6: Enable Platform Biometrics (Optional)

Leverage your device's built-in biometric authentication.

#### Supported Methods
- **Windows Hello**: Fingerprint, facial recognition, PIN
- **macOS Touch ID**: Fingerprint sensor on MacBooks
- **Android Biometrics**: Fingerprint sensors
- **FIDO2 Authenticators**: Any WebAuthn-compatible device

#### Setup Process

1. **Enable Platform Authenticator**
   - Click **Enable Biometrics** in setup wizard
   - System detects available biometric methods

2. **WebAuthn Registration**
   - Browser prompts for biometric setup
   - Windows: Use Windows Hello (Face, Fingerprint, or PIN)
   - macOS: Touch the Touch ID sensor
   - Linux: Enter PIN or use FIDO2 device

3. **Create Credential**
   - Platform creates cryptographic credential
   - Public key stored in ARGUS
   - Private key secured by platform (TPM/Secure Enclave)

4. **Test Authentication**
   - Click **Test Biometric**
   - Provide biometric verification
   - Success confirmation

:::success Why WebAuthn?
WebAuthn (Web Authentication) is a W3C standard for strong authentication. Your biometric data **never leaves your device**—only cryptographic signatures are transmitted. This ensures privacy and security.
:::

### Step 7: Create Multisig Account

With security layers configured, ARGUS now creates the on-chain multisig structure.

1. **Review Configuration**
   - Summary shows all enabled security layers:
     - ✓ Geographic Fence: Active
     - ✓ Voice Biometrics: Enrolled
     - ✓ Hardware Key: Registered (if configured)
     - ✓ Bluetooth Device: Paired (if configured)
     - ✓ Platform Biometrics: Enabled (if configured)

2. **Initiate Multisig Creation**
   - Click **Create Argus Vault**
   - ARGUS constructs Squads V4 multisig transaction

3. **Approve Transaction**
   - Transaction details shown:
     - Create multisig account
     - Fee: ~0.02 SOL (rent for accounts)
   - Enter wallet password
   - Click **Approve**

4. **On-Chain Creation**
   - Transaction submitted to Solana
   - Creating:
     - Multisig PDA (Program Derived Address)
     - Vault PDA
     - Authority accounts
   - Confirmation in ~500ms

5. **Backend Registration**
   - ARGUS sends vault details to backend
   - Server stores:
     - Multisig address
     - Geo-fence parameters
     - Voice fingerprint reference
     - Security configuration
   - Registration confirmed

6. **Vault Activated**
   - Success screen appears
   - Argus Vault address displayed
   - Copy address to clipboard
   - Click **Done**

### Step 8: Fund Your Argus Vault

Transfer assets from your wallet to the Argus Vault.

1. **Initiate Transfer**
   - From your wallet, click **Send**
   - Paste your Argus Vault address
   - ARGUS detects internal transfer (shows special icon)
   - Enter amount to transfer
   - Review and confirm
   - Transaction completes in seconds

2. **Verify Argus Vault Balance**
   - Switch to **Argus Vault** view
   - Your transferred balance appears
   - Assets now protected by all security layers

## Testing Your Argus Vault

After setup, perform these tests to ensure everything works correctly.

### Test 1: Successful Transaction

1. Switch to Argus Vault
2. Initiate a small transfer (0.01 SOL)
3. Complete all security verifications:
   - Record voice sample
   - Confirm geographic location
   - Connect hardware key (if configured)
   - Provide biometric (if configured)
4. Transaction should succeed
5. **Expected Result**: Transaction approved and executed

### Test 2: Location Verification

1. Disable location services or use VPN to change location
2. Attempt Argus Vault transaction
3. **Expected Result**: "Geographic verification failed" error
4. Re-enable accurate location
5. Retry transaction
6. **Expected Result**: Transaction succeeds

### Test 3: Voice Verification

1. Attempt transaction
2. During voice recording, speak very quietly or use wrong voice
3. **Expected Result**: "Voice verification failed" error (confidence below 0.75)
4. Retry with clear, normal voice
5. **Expected Result**: Voice verified successfully

### Test 4: Hardware Key (if configured)

1. Disconnect hardware key
2. Attempt transaction
3. **Expected Result**: "Hardware key not found" error
4. Connect registered device
5. Retry transaction
6. **Expected Result**: Hardware verified successfully

## Managing Your Argus Vault

### Viewing Vault Details

**Settings → Security → Argus Vault Information**

- Multisig address
- Vault PDA address
- Creation date
- Active security layers
- Transaction history
- Member public keys

### Modifying Security Layers

You can enable/disable security layers after creation:

**Add New Layer**:
1. Settings → Security → Add Security Layer
2. Follow enrollment process for new layer
3. Layer becomes active immediately

**Remove Layer**:
1. Settings → Security → Manage Layers
2. Select layer to remove
3. Confirm removal
4. Layer deactivated (can re-enable later)

**Note**: Voice and Location cannot be disabled—they are core to Argus Vault security.

### Adjusting Geo-Fence

**Settings → Security → Geo-Fence Configuration**

- View current center coordinates and radius
- **Change Radius**: Adjust from 100m to 5,000m
- **Relocate Center**: Requires special verification process:
  1. Submit request from current geo-fence
  2. Confirm via email
  3. 48-hour waiting period (security)
  4. Activate new location

:::warning Geo-Fence Changes
Changing your geo-fence center is intentionally difficult to prevent attackers from relocating your security boundary. Plan your initial location carefully.
:::

### Re-Enrolling Voice

If your voice verification starts failing:

1. Settings → Security → Voice Biometrics
2. Click **Re-Enroll Voice**
3. Record new samples
4. Old fingerprint replaced
5. Test immediately

**Common reasons to re-enroll**:
- Voice changed due to illness
- Different microphone quality
- Environmental noise issues
- False rejection rate too high

## Troubleshooting

### "Geographic verification failed"

**Causes**:
- GPS accuracy is poor (over 500m radius)
- VPN or proxy altering location
- Location services disabled
- Too far from geo-fence center

**Solutions**:
- Ensure GPS is enabled (not just IP-based location)
- Disable VPN during transactions
- Move closer to geo-fence center
- Wait for better GPS signal (near windows, outdoors)
- Increase geo-fence radius if legitimately needed

### "Voice verification failed"

**Causes**:
- Background noise
- Different microphone than enrollment
- Speaking too quietly/loudly
- Voice changed (illness, intoxication)
- Poor audio quality

**Solutions**:
- Move to quiet environment
- Speak at normal, consistent volume
- Use same microphone as enrollment
- Re-enroll voice if persistent issues
- Check microphone quality/settings

### "Hardware key not found"

**Causes**:
- Device not connected
- Wrong USB port
- Browser didn't get permission
- Device malfunction

**Solutions**:
- Ensure device is physically connected
- Try different USB port
- Grant browser USB permissions
- Check device works with other applications
- Use backup hardware key if registered
- Temporarily disable hardware layer

### "Multisig creation failed"

**Causes**:
- Insufficient SOL for rent
- Network congestion
- RPC node issues

**Solutions**:
- Ensure at least 0.05 SOL in Master Key
- Wait and retry
- Change RPC endpoint (Settings → Network)
- Check Solana network status

### Transaction Stuck "Pending"

**Causes**:
- Security verification incomplete
- Server communication issues
- Network transaction failed

**Solutions**:
- Complete all security verifications
- Check internet connection
- View transaction on Solscan (may already be confirmed)
- Contact support if stuck over 5 minutes

## Security Best Practices

**Do:**
- Test your Argus Vault with small amounts first
- Register backup hardware keys
- Keep voice enrollments updated
- Choose secure, controlled geo-fence locations
- Backup your seed phrase offline
- Monitor transaction history regularly
- Use Argus Vault for 95%+ of holdings

**Don't:**
- Set geo-fence at public locations
- Share voice recordings
- Use Argus Vault for frequent DeFi interactions
- Disable core security layers (voice, location)
- Trust public WiFi during transactions
- Rush through security verifications

## Advanced Configuration

### Multiple Argus Vaults

You can create multiple Argus Vaults for different purposes:

- **Home Vault**: Personal long-term holdings
- **Office Vault**: Business/organizational funds
- **Travel Vault**: Accessible from multiple locations (larger geo-fence)

Each vault has independent security configuration and location.

### Emergency Access

Configure emergency contacts who can help recover access:

1. Settings → Security → Emergency Contacts
2. Add trusted contacts (requires their ARGUS address)
3. Set recovery threshold (e.g., 2 of 3 contacts)
4. Emergency process has 7-day timelock

### Time-Based Restrictions

Set transaction windows for additional security:

1. Settings → Security → Time Restrictions
2. Configure allowed hours (e.g., 9 AM - 9 PM)
3. Timezone automatically detected
4. Transactions outside window require additional approval

## Next Steps

Your Argus Vault is now set up and secure! Continue exploring:

- **[Wallet Architecture Overview](/docs/argus-vault/wallet-architecture-overview)** - Deep dive into how it works
- **[How Argus Vault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - Understand security mechanisms
- **[Security Layers](/docs/argus-vault/security-layers)** - All security options explained

## Support

Need help with Argus Vault setup?

- **Twitter**: [X @useargus](https://x.com/useargus) - Community support
- **Email**: support@argusfoundation.com - Direct support
- **Documentation**: Browse security-related guides
- **GitHub**: Report technical issues at [github.com/argusfoundation](https://github.com/argusfoundation)

---

**Your assets are now protected by the most advanced wallet security in cryptocurrency.**

