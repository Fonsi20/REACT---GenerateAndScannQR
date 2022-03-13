import './App.css';
import QRCode from 'react-qr-code';
import {
  Container,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from '@mui/material';
import { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';

function App() {
  const [text, setText] = useState('');
  const [textForImage, setTextForImage] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const qrRef = useRef(null);

  const generateQrCode = async () => {
    try {
      const response = await text;
      setTextForImage(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleErrorFile = error => {
    console.log(error);
  };

  const handleScanFile = result => {
    if (result) {
      setScanResultFile(result);
    }
  };

  const onScanFile = () => {
    qrRef.current.openImageDialog();
  };

  return (
    <div className="App">
      <header className="App-header">
        <Container className="App">
          <Card>
            <h2 className="Title-App">Generate Download & Scan QR Code</h2>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <TextField
                    label="Name"
                    onChange={e => setText(e.target.value)}
                  />
                  <Button
                    variant="contined"
                    color="secondary"
                    className="Button-Generic"
                    onClick={() => generateQrCode()}
                  >
                    Regist Bike
                  </Button>
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  {textForImage ? (
                    <QRCode
                      value={`${textForImage}`}
                      fgColor="#ffffff"
                      bgColor="#282c34"
                    />
                  ) : null}
                </Grid>
                <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                  <QrReader
                    delay={300}
                    style={{ width: '100%' }}
                    onError={handleErrorFile}
                    onScan={handleScanFile}
                  />
                  <h3>Scanned Code: {scanResultFile}</h3>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </header>
    </div>
  );
}

export default App;
