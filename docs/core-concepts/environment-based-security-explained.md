# Environment-Based Security Explained

<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '2rem 0', borderRadius: '12px', overflow: 'hidden'}}>
  <img src="/img/protections_options.jpg" alt="Protection Options" style={{width: '100%', maxWidth: '100%', height: 'auto', borderRadius: '12px'}} />
</div>

Environment-based security is the core innovation of ARGUS. Instead of relying solely on cryptographic keys, ARGUS verifies real-world context before allowing transactions.

## What Is Environment-Based Security?

Environment-based security verifies **real-world context** in addition to cryptographic proofs. It answers questions like who is initiating the transaction, where the transaction is coming from, when the transaction should be allowed, how the transaction is being approved, and what devices and environments are involved.

Traditional wallets only verify: "Does this signature match the private key?"

ARGUS verifies: "Does this signature match the key **AND** is the context correct?"

## The Components

### Geographic Context

Geographic context verifies physical location through GPS coordinates checked against an authorized geo-fence. This prevents remote attacks—an attacker thousands of kilometers away cannot execute transactions. For example, a transaction from New York fails if Argus Vault is configured for London.

### Biometric Context

Biometric context provides biological identity verification through voice biometrics and platform biometrics like fingerprint or Face ID. This proves the person initiating the transaction is the authorized user. A voice sample must match the enrolled voice print with greater than 75% confidence.

### Hardware Context

Hardware context requires physical device presence. USB hardware keys and Bluetooth devices are verified to ensure the user has physical possession of authorized devices. A transaction fails if the registered USB key is not connected.

### Network Context

Network context analyzes network and device environment characteristics, including network patterns, device fingerprints, and connection patterns. This detects anomalies and suspicious environments. A transaction from a new network or device may require additional verification.

### Temporal Context

Temporal context provides time-based verification by analyzing transaction timing, patterns, and sequences. This detects unusual activity patterns. A large transaction at an unusual time may trigger additional checks.

## How It Works Together

Environment-based security uses **multiple independent layers** that all must pass. When a transaction is requested, it must pass cryptographic signature verification, geographic location checks, voice biometric matching, hardware device presence, and network/environment analysis. If **any** layer fails, the transaction is rejected.

## Why It Works

### Defense in Depth

Each layer is **independent**. Compromising one doesn't compromise others. Steal the key? Still need location. Spoof location? Still need voice. Synthesize voice? Still need hardware. Steal hardware? Still need location.

The result: an attacker must compromise multiple independent systems simultaneously.

### Real-World Binding

Environment-based security **binds transactions to physical reality**. You cannot execute from a remote location, cannot execute without the authorized person, cannot execute without authorized devices, and cannot execute in suspicious environments.

The result: remote attacks become mathematically impossible.

### Context Awareness

Environment-based security **understands context**. It knows where transactions should come from, who should be initiating them, what devices should be present, and when transactions are normal.

The result: anomalies are detected and blocked automatically.

## Comparison to Traditional Security

Traditional security is key-based: key leads to signature, which leads to transaction execution. The problem is that the key alone is sufficient, with no context verification.

ARGUS security is environment-based: key plus location plus voice plus hardware plus environment must all be verified before transaction execution. The solution is that the key is necessary but not sufficient—context must also be correct.

## Attack Scenarios

### Stolen Private Key

In a traditional wallet, an attacker uses the key and drains funds immediately. With ARGUS, the attacker has the key but is not at the authorized location, cannot provide voice biometrics, and has no access to hardware. The attack fails at the first security check.

### Phishing Attack

In a traditional wallet, a user reveals the seed phrase and the attacker drains funds. With ARGUS, the attacker has the seed phrase but cannot be at the user's location, cannot replicate the user's voice, and does not have the user's hardware. The attack fails due to multiple requirements.

### Remote Malware

In a traditional wallet, malware steals the key and the attacker drains funds remotely. With ARGUS, malware steals the key but the attacker is not at the location, cannot provide biometrics, and has no access to hardware. The attack fails due to physical requirements.

## Benefits

For users, environment-based security provides peace of mind (remote attacks become impossible), flexibility (configure security layers based on needs), control (you decide what context is required), and simplicity (works automatically, no manual intervention).

For security, it provides multiple layers (defense-in-depth, not single point of failure), real-world binding (physical presence required), context awareness (understands normal vs. suspicious), and on-chain enforcement (security exists independently of infrastructure).

For adoption, it's user-friendly (invisible to users, works automatically), configurable (users choose security level), scalable (works for millions of users), and proven (based on established security principles).

## Key Takeaways

Environment-based security verifies real-world context. Multiple independent layers provide defense-in-depth. Real-world binding makes remote attacks impossible. Context awareness detects anomalies automatically. And the user-friendly implementation works invisibly.

Environment-based security represents the future of cryptocurrency wallet protection.

---

## Next Steps

- **[How Argus Vault Security Works](/docs/argus-vault/how-argus-vault-security-works)** - See environment-based security in action
- **[Security Layers](/docs/argus-vault/security-layers)** - Deep dive into each layer
- **[What Is a Argus Vault](/docs/core-concepts/what-is-argus-vault)** - Understanding Argus Vault
