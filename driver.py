import json
import sys
import time



LED_COUNT   = int(sys.argv[3])   # Number of LED pixels.
LED_PIN     = 21      # GPIO pin connected to the pixels (must support PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA     = 10       # DMA channel to use for generating signal (try 5)
LED_BRIGHTNESS = 30     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53


from neopixel import *

blink = []

led_strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
led_strip.begin()



def array_loop(inputArray):
    blinkcount = 0
    blinkState = False
    for x in range(len(inputArray)):
        if (isinstance(inputArray[x], list)):
            blink.append([])
            blink[blinkcount].append(x)
            for k in range(len(inputArray[x])):
                blink[blinkcount].append(inputArray[x][k])
            blinkcount += 1
            blinkState = True;
        elif (isinstance(inputArray[x], int)):
            led_strip.setPixelColor(x, inputArray[x])
        else:
            print("Onjuiste Input")
    led_strip.show()
    return blinkState


def read_in():
    lines = sys.stdin.readline()
    return json.loads(lines)


while(True):
    blinkState = False;
    i = 1
    sys.stdout.flush()
    data = read_in()
    sys.stdout.flush()
    if data:
        inputArray = data['input']
        blinkState = array_loop(inputArray)
    blinkState =array_loop(inputArray)
    start = time.time()
    while(blinkState):
        sys.stdout.flush()
        data = read_in()
        sys.stdout.flush()
        if data:
            inputArray = data['input']
            blinkState = array_loop(inputArray)
            break
        if i >= len(max(blink, key=len)):
               i = 1
        if (time.time() - start) > 0.5:
            start = time.time()
            i += 1;
        for q in range(len(blink)):
            try:
                led_strip.setPixelColor(blink[q][0], blink[q][i])
            except IndexError:
                led_strip.setPixelColor(blink[q][0], blink[q][1])
            led_strip.show()




