import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Linking } from 'react-native';
const Scanner = ()=>{
 
    const onScan = (e)=>{
        try {
            const url = e.data;
            if (url && url.startsWith("http")) {
                Linking.openURL(url);
            } else {
                console.log("Invalid URL scanned");
            }
        } catch (error) {
            console.error("Error opening URL:", error);
        }
        
    }

    return(
        <QRCodeScanner
        onRead={onScan}
        flashMode={RNCamera.Constants.FlashMode.torch}
        cameraStyle={{ flex: 1 }}
        topContent={
            <Text style={{ fontSize: 18, padding: 10 }}>
                Scan a QR code to open a link
            </Text>
        }
        bottomContent={
            <Text style={{ fontSize: 14, padding: 10 }}>
                Hold the camera steady
            </Text>
        }
    />
    )
}
export default Scanner