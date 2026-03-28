/**
 * FRED — Friendly Register Extraction Device
 */
//% weight=100 color=#00AEEF icon=""
namespace FRED {

    /**
     * Read a single byte from an I²C device register.
     * @param address the 7‑bit I²C device address
     * @param register the register address to read
     */
    //% block="FRED read from I2C device %address| register %register"
    export function readRegister(address: number, register: number): number {
        const buf = pins.createBuffer(1)
        buf[0] = register

        // Write register address, then read one byte
        pins.i2cWriteBuffer(address, buf, false)
        const result = pins.i2cReadNumber(address, NumberFormat.UInt8BE, false)

        return result
    }
}
