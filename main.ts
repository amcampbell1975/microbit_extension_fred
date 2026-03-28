/**
 * FRED — VL53L8CX 8×8 ToF reader
 */
//% weight=100 color=#55AEEF icon=""
namespace FRED_VL53L8CX {

    const VL53L8CX_ADDR = 0x52 >> 1   // 7‑bit address (0x29)

    // Starting register of the measurement data block
    const RESULT_START = 0x0F

    // Number of zones (8×8)
    const ZONES = 64

    /**
     * Read 64 range measurements (mm) from VL53L8CX
     * Returns an array of 64 numbers
     */
    //% block="FRED read VL53L8CX 8×8 distances"
    export function readVL53L8CX(): number[] {

        // Each zone is a 16‑bit distance → 64 × 2 = 128 bytes
        const bytesToRead = ZONES * 2

        // Write the starting register
        let reg = pins.createBuffer(1)
        reg[0] = RESULT_START
        pins.i2cWriteBuffer(VL53L8CX_ADDR, reg, false)

        // Read the full block
        let raw = pins.i2cReadBuffer(VL53L8CX_ADDR, bytesToRead, false)

        // Convert to array of 64 distances
        let distances: number[] = []

        for (let i = 0; i < ZONES; i++) {
            let hi = raw[i * 2]
            let lo = raw[i * 2 + 1]
            let dist = (hi << 8) | lo
            distances.push(dist)
        }

        return distances
    }
}
