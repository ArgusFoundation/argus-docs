# Installation

Get ARGUS wallet up and running in minutes with this comprehensive installation guide.

<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '3rem 1rem', margin: '2rem 0', backgroundColor: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px', border: '3px solid #10b981', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'}}>
  <video
    controls
    autoPlay
    muted
    loop
    style={{width: '100%', maxWidth: '1200px', height: 'auto', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'}}
  >
    <source src="/img/create_wallet.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>

<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '3rem 0', padding: '0 1rem'}}>
  <a 
    href="https://drive.google.com/uc?export=download&id=1zJWfDuQzCajmV_dmsObqwVk73zWES7zg"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '1rem 2.5rem',
      backgroundColor: '#10b981',
      color: 'white',
      borderRadius: '12px',
      textDecoration: 'none',
      fontWeight: '600',
      fontSize: '1.125rem',
      boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)',
      transition: 'all 0.2s ease',
      border: 'none',
      cursor: 'pointer',
      minWidth: '280px',
      height: '50px'
    }}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink: 0}}>
      <path d="M19 12v7H5v-7M12 3v13M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span>Download ARGUS Wallet</span>
  </a>
</div>

## Prerequisites

Before installing ARGUS, ensure you have:

- **Chrome Browser** (version 88 or higher) or any Chromium-based browser (Brave, Edge, Opera)
- **Windows 10/11**, **macOS 10.15+**, or **Linux** (Ubuntu 20.04+)
- **Active internet connection** for initial setup and verification
- **Microphone access** for voice biometric enrollment (can be configured later)
- **Location services** enabled for geographic verification (optional but recommended)

## Installation Methods

### Method 1: Chrome Web Store (Recommended)

1. **Open Chrome Web Store**
   - Navigate to the [ARGUS Chrome Extension](https://chrome.google.com/webstore/argus-wallet) page
   - Or search for "ARGUS Wallet" in the Chrome Web Store

2. **Install Extension**
   - Click the **Add to Chrome** button
   - Review the required permissions
   - Click **Add extension** to confirm

3. **Pin Extension**
   - Click the puzzle icon in Chrome toolbar
   - Find ARGUS Wallet and click the pin icon
   - ARGUS icon now appears in your browser toolbar

### Method 2: Manual Installation (Development)

For developers or testing purposes:

1. **Download Release**
   ```bash
   git clone https://github.com/argus-foundation/argus-wallet.git
   cd argus-wallet
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build Extension**
   ```bash
   npm run build
   ```

4. **Load in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top-right)
   - Click **Load unpacked**
   - Select the `build/chrome-mv3-prod` directory

## Required Permissions

ARGUS requires the following permissions to function:

| Permission | Purpose |
|------------|---------|
| `storage` | Store encrypted wallet data and settings |
| `activeTab` | Interact with DApps and web pages |
| `geolocation` | Verify geographic location for Argus Vault |
| `usb` | Support USB hardware key authentication |
| `bluetooth` | Support Bluetooth device authentication |
| `clipboardWrite` | Copy addresses and transaction IDs |

:::info
ARGUS follows privacy-first principles. Your private keys and sensitive data never leave your device. Geographic coordinates are only transmitted during transaction approval for the Argus Vault.
:::

## Initial Setup

After installation, ARGUS will guide you through initial setup:

1. **Welcome Screen**
   - Choose between creating a new wallet or importing existing

2. **Password Creation**
   - Create a strong password (minimum 8 characters)
   - Include uppercase, lowercase, numbers, and symbols
   - This encrypts your local wallet data

3. **Backup Seed Phrase**
   - Write down your 12 or 24-word recovery phrase
   - Store it securely offline (never digital storage)
   - This is your only recovery method if you lose access

4. **Verify Seed Phrase**
   - Confirm your seed phrase by selecting words in order
   - Ensures you've correctly recorded your backup

## Verification

Once installed, verify ARGUS is working correctly:

1. **Open Wallet**
   - Click the ARGUS icon in your Chrome toolbar
   - The wallet interface should appear (360x600 popup)

2. **Check Connection**
   - You should see "Connected" status indicator
   - Solana network status shown in header

3. **View Your Address**
   - Your Solana public address is displayed
   - Click to copy to clipboard

## Post-Installation Steps

### Create Your Master Key Wallet
Your hot wallet is automatically created during setup. You can:
- Receive tokens immediately
- Send transactions after funding
- Connect to DApps

### Set Up Your Argus Vault (Recommended)
For maximum security, configure your Argus Vault:
1. Navigate to **Settings → Security**
2. Click **Create Argus Vault**
3. Follow the setup wizard (see [Argus Vault Setup](/docs/getting-started/geo-vault-setup))

### Configure Security Layers
Enhance your security by enabling additional layers:
- **Voice Biometrics**: Record your voice sample
- **Hardware Keys**: Register USB security keys
- **Bluetooth Devices**: Pair trusted devices
- **Platform Biometrics**: Enable fingerprint/Face ID

## Updating ARGUS

ARGUS automatically updates through the Chrome Web Store. To manually check for updates:

1. Navigate to `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Update** button at the top
4. ARGUS will update to the latest version

## Troubleshooting Installation

### Extension Won't Install
- **Clear Chrome cache**: Settings → Privacy → Clear browsing data
- **Disable conflicting extensions**: Temporarily disable other wallet extensions
- **Check Chrome version**: Ensure you're running Chrome 88+

### Extension Not Appearing
- **Check if enabled**: Go to `chrome://extensions/` and ensure ARGUS is enabled
- **Pin to toolbar**: Click puzzle icon → find ARGUS → click pin
- **Reinstall**: Remove and reinstall from Web Store

### Permissions Denied
- **Grant permissions**: Click ARGUS icon → Settings → Permissions
- **Browser settings**: Check Chrome Settings → Site Settings → Permissions
- **OS permissions**: macOS users check System Preferences → Security & Privacy

### Network Connection Issues
- **Check internet**: Ensure stable internet connection
- **Firewall settings**: Allow ARGUS through firewall
- **VPN conflicts**: Some VPNs may interfere with Solana RPC connections

## Next Steps

Now that ARGUS is installed, you're ready to:

1. **[Argus Vault Setup](/docs/getting-started/geo-vault-setup)** - Enable maximum security
2. **[Security Layers](/docs/argus-vault/security-layers)** - Configure all security layers

## Support

Need help with installation?

- **Documentation**: Browse our comprehensive guides
- **Twitter**: Follow us on [X @useargus](https://x.com/useargus)
- **Email**: support@argusfoundation.com
- **GitHub Issues**: Report bugs at [github.com/argusfoundation](https://github.com/argusfoundation)

---

**Ready to secure your assets?** Continue to the [Argus Vault Setup](/docs/getting-started/geo-vault-setup) →



