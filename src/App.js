import { useState, useEffect } from 'react'
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk'
import './App.css'

function App() {
  const [reclaimProofRequest, setReclaimProofRequest] = useState(null)
  const [proofs, setProofs] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    async function initializeReclaim() {
      try {
        const APP_ID = process.env.REACT_APP_RECLAIM_APP_ID
        const APP_SECRET = process.env.REACT_APP_RECLAIM_APP_SECRET
        // you can get the provider ID from the Reclaim Developer Portal dashboard
        const PROVIDER_ID = 'f2d4b54c-26f6-4f59-b6d8-c6b917bb428e'

        if (!APP_ID || !APP_SECRET) {
          setError('Please configure your Reclaim Protocol credentials in the .env file')
          return
        }

        const proofRequest = await ReclaimProofRequest.init(
          APP_ID,
          APP_SECRET,
          PROVIDER_ID,
        )
        setReclaimProofRequest(proofRequest)
      } catch (err) {
        setError('Failed to initialize Reclaim Protocol: ' + err.message)
      }
    }

    initializeReclaim()
  }, [])

  async function handleCreateClaim() {
    if (!reclaimProofRequest) {
      setError('Reclaim Proof Request not initialized')
      return
    }

    setIsLoading(true)
    setError('')
    setProofs('')

    try {
      reclaimProofRequest.setModalOptions({
        title: 'Verify Your Netflix Watch History',
        description: 'Scan the QR code with your mobile device to verify your Netflix watch history',
        showExtensionInstallButton: false,
        modalPopupTimer: 10, 
        onClose: () => {
          setIsLoading(false)
        } 
      })
      

     await reclaimProofRequest.triggerReclaimFlow();



      await reclaimProofRequest.startSession({
        onSuccess: (proofs) => {
          setIsLoading(false)
          if (proofs && typeof proofs === 'string') {
            // When using a custom callback url, the proof is returned to the callback url and we get a message instead of a proof
            console.log('SDK Message:', proofs)
            setProofs(proofs)
          } else if (proofs && typeof proofs !== 'string') {
            // When using the default callback url, we get a proof
            if (Array.isArray(proofs)) {
              // when using the cascading providers, providers having more than one proof will return an array of proofs
              console.log(JSON.stringify(proofs.map(p => p.claimData.context)))
            } else {
              console.log('Proof received:', proofs?.claimData.context)
            }
            setProofs(proofs)
          }
        },
        onError: (error) => {
          setIsLoading(false)
          console.error('Verification failed', error)
          setError('Verification failed: ' + error.message)
        }
      })
    } catch (err) {
      setIsLoading(false)
      setError('Failed to create claim: ' + err.message)
    }
  }

  const handleCopyProof = async () => {
    const text = JSON.stringify(proofs, null, 2);
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1 className="title">Vana POC</h1>
          <p className="subtitle">
            Verify your Netflix watch history and ratings securely using cryptographic proofs
          </p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            className="button"
            onClick={handleCreateClaim}
            disabled={isLoading || !reclaimProofRequest}
          >
            {isLoading ? (
              <>
                <span className="spinner" style={{
                  display: 'inline-block',
                  width: '1em',
                  height: '1em',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '2px solid #fff',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite',
                  marginRight: '0.5em',
                  verticalAlign: 'middle'
                }} />
                Creating Claim...
              </>
            ) : (
              'Create Claim'
            )}
          </button>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {proofs && (
          <div className="proof-section">
            <h2>Verification Complete!</h2>
            <div className="proof-data" style={{ position: 'relative' }}>
              <pre id="proof-pre">{JSON.stringify(proofs, null, 2)}</pre>
              <button
                className="copy-button"
                onClick={handleCopyProof}
                aria-label="Copy proof data"
                title="Copy proof data"
              >
                {copySuccess ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App