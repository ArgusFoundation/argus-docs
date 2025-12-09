# Security Layers

<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0', borderRadius: '12px', overflow: 'hidden'}}>
  <img src="/img/security_layers.jpg" alt="Security Layers" style={{width: '100%', maxWidth: '100%', height: 'auto', borderRadius: '12px'}} />
</div>

ARGUS implements a defense-in-depth security model with multiple independent layers of protection. Each layer is designed to be independently secure, and together they create a security system that is virtually impossible to breach remotely.

## The Security Architecture

Argus Vault transactions flow through multiple verification layers. Voice biometrics, geographic verification, and hardware keys form the core protection, while Bluetooth devices and platform biometrics add additional layers. All configured layers must pass before a transaction can execute.

## Voice Biometrics

Voice biometrics is a required core layer that uses your unique voice print as a biometric signature. During enrollment, you record a voice sample, and ARGUS extracts MFCC (Mel-frequency cepstral coefficients) features to create your voice fingerprint. During verification, your voice is matched against this fingerprint with a minimum 75% confidence threshold required.

The attack resistance is very high due to voice synthesis detection, liveness verification, environmental consistency checks, and recording quality analysis. This layer proves the person initiating the transaction is the authorized user, prevents unauthorized use of stolen keys, and adds biometric identity verification.

Voice biometrics is required for all Argus Vaults, can be re-enrolled if your voice changes, and multiple voice profiles will be supported in future updates.

## Geographic Verification

Geographic verification is another required core layer that ensures transactions are only approved from specific physical locations. GPS coordinates are captured during vault creation, and a circular geo-fence is established with a configurable radius (default 500 meters). During verification, the Haversine distance formula calculates your distance from the geo-fence center, and location accuracy is assessed.

The attack resistance makes remote attacks impossible because physical presence is required, GPS spoofing is detected through multiple location data sources, and VPN/proxy usage is identified. This prevents remote attacks and requires physical presence at an authorized location, making key theft from distance ineffective.

Geographic verification is required for all Argus Vaults, with a radius configurable from 100 meters to 5,000 meters. The center can be relocated, though this requires a security delay period.

## USB Hardware Keys

USB hardware keys are an optional but recommended layer that adds physical device presence as an authentication factor. During setup, you register your USB device, and ARGUS stores the Vendor ID and Product ID. The WebUSB API detects device presence during transactions.

The attack resistance is high because it requires physical theft of the device. Multiple devices can be registered as backups, and the verification is presence-based rather than cryptographic, making it simpler but still effective.

This layer adds a physical device requirement, prevents unauthorized device access, and provides a backup authentication method. Supported devices include YubiKey (all models), Ledger hardware wallets, Trezor, any USB security key, and generic USB devices used as presence tokens.

## Bluetooth Devices

Bluetooth devices are an optional but recommended layer that uses trusted Bluetooth devices for proximity-based authentication. You pair your smartphone, smartwatch, or other device during setup, and the Web Bluetooth API detects the device during transactions. The device must be nearby and discoverable for verification to pass.

The attack resistance is high because it requires physical proximity. Multiple devices are supported, and backup devices prevent lockout if your primary device is unavailable.

This layer provides proximity-based verification, is convenient for users with smartphones or smartwatches, and adds another layer of physical presence. Supported devices include smartphones (iOS and Android), smartwatches like Apple Watch and Samsung Galaxy Watch, fitness trackers with Bluetooth, Bluetooth headphones with unique identifiers, and any discoverable Bluetooth device.

## Platform Biometrics

Platform biometrics is an optional but recommended layer that leverages your device's built-in biometric authentication like Touch ID or Windows Hello. This uses the WebAuthn standard, with cryptographic credentials stored in TPM or Secure Enclave. Your biometric data never leaves the device, and challenge-response authentication is used.

The attack resistance is very high due to hardware-backed security, biometric data isolation, no over-the-wire transmission, and FIDO2 certification. This provides device-level authentication with hardware-backed security and is convenient for users with biometric-capable devices.

Supported methods include Windows Hello (fingerprint, facial recognition, PIN), macOS Touch ID (fingerprint sensor on MacBooks), Android Biometrics (fingerprint sensors), and FIDO2 Authenticators (any WebAuthn-compatible device).

## Security Configuration

### Minimum Configuration

All Argus Vaults must have voice biometrics enrolled and geographic fence configured. This provides strong protection against remote attacks.

### Recommended Configuration

For maximum security, enable voice biometrics, configure geographic fence, register one to two hardware keys, pair one to two Bluetooth devices, and enable platform biometrics. This creates five independent barriers an attacker must overcome.

### Advanced Configuration

Power users can add multiple hardware keys (primary plus backups), multiple Bluetooth devices (phone plus watch plus earbuds), multiple geo-fences (different vault per location), time-based restrictions (planned), and transaction amount limits (planned).

## How Layers Work Together

### Defense in Depth

Each layer is **independent**. Compromising one doesn't compromise others. Steal the key? Still need location. Spoof location? Still need voice. Synthesize voice? Still need hardware. Steal hardware? Still need location.

The result: an attacker must compromise multiple independent systems simultaneously.

### All Layers Must Pass

For a transaction to execute, **all configured layers** must pass. The transaction flows through voice biometric verification, geographic location checks, hardware key presence (if enabled), Bluetooth device proximity (if enabled), and platform biometric authentication (if enabled). If **any** layer fails, the transaction is rejected.

## Attack Scenarios

### Remote Attack

When an attacker steals a private key remotely through phishing or malware, the key alone is insufficient. Voice verification fails because there's no voice sample. Geographic verification fails because the attacker is not at the authorized location. Hardware key verification fails because there's no physical device present. The result: fully protected.

### Voice Synthesis

When an attacker uses AI to synthesize the user's voice, voice synthesis detection algorithms analyze the sample. Environmental noise consistency checks, recording quality analysis, and liveness verification all work together to detect synthetic voices. The result: protected with active countermeasures.

### GPS Spoofing

When an attacker attempts to spoof GPS coordinates, multiple location data sources are checked (GPS plus IP plus WiFi). Consistency checks across sources, accuracy radius validation, and VPN/proxy detection all work to identify spoofing attempts. The result: protected with detection mechanisms.

## Key Takeaways

Five independent layers provide defense-in-depth. Required layers (voice plus location) provide strong protection. Optional layers add additional security. All layers must pass for transaction approval. And the configuration is flexible based on user needs.

Each security layer adds independent protection, making unauthorized access virtually impossible.

---

## Next Steps

- **[How Argus Vault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - See all layers in action
- **[Getting Started: Argus Vault Setup](/docs/getting-started/geo-vault-setup)** - Configure your security layers
- **[Security Layers Overview](/docs/argus-vault/security-layers)** - Understanding all security options
