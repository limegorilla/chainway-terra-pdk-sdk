package expo.modules.chainwayterrapdksdk

// Imports for Native Barcode AAR
import android.content.Context
import androidx.core.os.bundleOf
import com.rscja.barcode.BarcodeDecoder
import com.rscja.barcode.BarcodeFactory
import com.rscja.barcode.BarcodeUtility
import com.rscja.CWDeviceInfo
import com.rscja.scanner.utility.ScannerUtility
import com.rscja.scanner.led.ScanLedManage
import com.rscja.scanner.led.ScanLed
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import kotlinx.coroutines.awaitAll


// Events
private var bcScanSuccess = "eventBarcodeScanSuccess"
private var bcScanFail = "eventBarcodeScanFail"
private var bcScanReady = "eventBarcodeScanScannerReady"

class ChainwayTerraPdkSdkModule : Module() {

    private val context: Context
        get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

    // Variables
    private var barcodeDecoder: BarcodeDecoder = BarcodeFactory.getInstance().barcodeDecoder
    private var deviceInfo = CWDeviceInfo.getDeviceInfo()
    private var scanner = ScannerUtility.getScannerInerface()
    private var scanLed: ScanLed = ScanLedManage.getInstance().scanLed


    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    override fun definition() = ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('ChainwayTerraPdkSdk')` in JavaScript.
        Name("ChainwayTerraPdkSdk")

        Function("prepareScanner") {
            if (barcodeDecoder.isOpen) {
//          Force closes the barcode reader if open
                barcodeDecoder.close()
            }
            barcodeDecoder.open(context)

//            Init the LED
           scanLed.init(context)
//    Set the scanner to desired settings
//    In future these should be configurable by the device's user
            BarcodeUtility.getInstance().enableEnter(context, true)
            BarcodeUtility.getInstance().enablePlayFailureSound(context, true)
            BarcodeUtility.getInstance().enablePlaySuccessSound(context, true)
            BarcodeUtility.getInstance().enableVibrate(context, true)

//    These should be hardcoded as we do not support these methods of entry
            BarcodeUtility.getInstance().closeKeyboardHelper(context)
        }

//     Getter Functions. Used to get/set scanner state

        Function("isPhysicalScanner") {
            print(deviceInfo.team)
            print(deviceInfo.model)
            print(deviceInfo.cpuType)
            print(deviceInfo.modelAndCpu)

            return@Function true
        }

        Function("isScannerReady") {
            return@Function barcodeDecoder.isOpen()
        }

//    Triggered by App. Will run the scanner - triggers the callback
        AsyncFunction("scanBarcode") {
            barcodeDecoder.startScan()
        }

        Events(bcScanFail, bcScanSuccess, bcScanReady)
    }


    private val listener = barcodeDecoder.setDecodeCallback() { rec ->

        if (rec.resultCode === BarcodeDecoder.DECODE_SUCCESS) {
            this@ChainwayTerraPdkSdkModule.sendEvent(
                bcScanSuccess,
                bundleOf(
                    "barcodeData" to rec.barcodeData,
                    "resultCode" to rec.resultCode,
                    "prefix" to rec.prefix,
                    "aimId" to rec.aimId,
                    "errCode" to rec.errCode,
                    "barcodeBytesData" to rec.barcodeBytesData,
                    "barcodeName" to rec.barcodeName,
                    "barcodeSymbology" to rec.barcodeSymbology,
                    "decodeTime" to rec.decodeTime
                )
            )
        } else {
            // Handle failed barcode scan
            this@ChainwayTerraPdkSdkModule.sendEvent(
                bcScanFail,
                bundleOf(
                    "barcodeData" to rec.barcodeData,
                    "resultCode" to rec.resultCode,
                    "prefix" to rec.prefix,
                    "aimId" to rec.aimId,
                    "errCode" to rec.errCode,
                    "barcodeBytesData" to rec.barcodeBytesData,
                    "barcodeName" to rec.barcodeName,
                    "barcodeSymbology" to rec.barcodeSymbology,
                    "decodeTime" to rec.decodeTime
                )
            )
        }
    }

}


