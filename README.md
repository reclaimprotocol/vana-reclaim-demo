# Vana - Demo

This is a demo website that uses `@reclaimprotocol/js-sdk` to interact with the Reclaim protocol.

## Overview

This demo showcases how to integrate the Reclaim Protocol into a React application to verify netflix watch history and ratings. The application allows users to create verification requests that can be completed by scanning a QR code with the Reclaim mobile app.

## 🚀 Quick Start

Get the Reclaim Protocol demo running in few minutes!

### Getting Started

To get started, clone this repository and install the dependencies:

#### 1. Install Dependencies
```bash
npm install
```


#### 2. Get Your Credentials
1. Sign up at [dev.reclaimprotocol.org](https://dev.reclaimprotocol.org)
2. Create a new application in the dashboard and add a provider
3. Save the following credentials:
   - Application ID
   - Application Secret
   - Provider ID

#### 3. Set up Environment Variables
```bash
cp .env.example .env
```

#### 4. Configure Credentials
Open `src/App.js` and replace the placeholder values:

```javascript
const APP_ID = 'YOUR_APPLICATION_ID_HERE'
const APP_SECRET = 'YOUR_APPLICATION_SECRET_HERE'
const PROVIDER_ID = 'YOUR_PROVIDER_ID_HERE'
```

#### 5. Update Provider IDs
Update the provider IDs in `src/App.js` on the appropriate line to the provider IDs you received from Reclaim Developer Portal.

#### 6. Start the App
```bash
npm start
```

#### 7. Test the Demo
1. Open your browser to [http://localhost:3000](http://localhost:3000)
2. Click "Create Claim"
3. Scan the QR code with the Reclaim mobile app
4. Complete the verification process
5. View the proof results!


### Update Provider IDs

Update the provider IDs in `src/App.js` on the appropriate line to the provider IDs you received from the Reclaim Developer Portal.

## Usage

### Basic Flow

1. **Initialize**: The app automatically initializes the Reclaim Proof Request when the component mounts
2. **Create Claim**: Click the "Create Claim" button to generate a verification request
3. **Scan QR Code**: Use the Reclaim mobile app to scan the displayed QR code
4. **Complete Verification**: Follow the prompts in the mobile app to complete the verification
5. **View Results**: Once verified, the proof data will be displayed on the screen

### Component Structure

The main `App` component manages the following state:

- `reclaimProofRequest`: The initialized Reclaim Proof Request instance
- `triggerReclaimFlow()`: Triggers the Reclaim flow and starts the verification session
- `proofs`: The received proof data after successful verification

## API Reference

### ReclaimProofRequest

The main class for interacting with the Reclaim Protocol:

```javascript
const proofRequest = await ReclaimProofRequest.init(
  APP_ID,
  APP_SECRET,
  PROVIDER_ID
)
```

#### Methods

- `triggerReclaimFlow()`: Triggers the Reclaim flow and starts the verification session
- `startSession(options)`: Starts the verification session

#### Session Options

```javascript
{
  onSuccess: (proofs) => {
    // Handle successful verification
  },
  onFailure: (error) => {
    // Handle verification failure
  }
}
```

## Contributing

1. Fork the repository [https://github.com/reclaimprotocol/vana-reclaim-demo](https://github.com/reclaimprotocol/vana-reclaim-demo)
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Support

For issues related to:
- **Reclaim Protocol**: Visit [dev.reclaimprotocol.org](https://dev.reclaimprotocol.org)
- **This Demo**: Open an issue in this repository
- **General Questions**: Check the [Reclaim Protocol documentation](https://docs.reclaimprotocol.org)

## Related Links

- [Reclaim Protocol Documentation](https://docs.reclaimprotocol.org)
- [Reclaim Protocol Whitepaper](https://drive.google.com/file/d/1Ru2bq81wTXZ1KbTajjNKTjkH2u3q2O3K/view)



