import json
import sys
import time



LED_COUNT   = 100   # Number of LED pixels.
LED_PIN     = 21      # GPIO pin connected to the pixels (must support PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA     = 10       # DMA channel to use for generating signal (try 5)
LED_BRIGHTNESS = 30     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53


from neopixel import *

blink = []
# init led strip
led_strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
led_strip.begin()


# Deze functie verwerkt json array die hij krijgt van de boardcontroller
def array_loop(inputArray):
    blinkcount = 0
    blinkState = False
    # itiratie door array
    for x in range(len(inputArray)):
        #in het geval dat er twee kleuren op 1 opsitie staan toevoegen aan speciale array
        if (isinstance(inputArray[x], list)):
            blink.append([])
            blink[blinkcount].append(x)
            for k in range(len(inputArray[x])):
                blink[blinkcount].append(inputArray[x][k])
            blinkcount += 1
            blinkState = True
        # in het geval in kleur op een positie
        elif (isinstance(inputArray[x], int)):
            led_strip.setPixelColor(x, inputArray[x])
        else:
            print("Onjuiste Input")
    #weergeven van ledstrip
    led_strip.show()
    #array met de posities die moeten knipperen
    return blinkState

#inlezen json array
def read_in():
    lines = sys.stdin.readline()
    return json.loads(lines)


# main loop
while(True):
    blinkState = False
    i = 1
    # inlezen en controleren op data
    sys.stdout.flush()
    data = read_in()
    sys.stdout.flush()
    if data:
        inputArray = data
        blinkState = array_loop(inputArray)
    blinkState =array_loop(inputArray)
    start = time.time()
    #knipperen op bepaalde posities volgens de array
    while(blinkState):
        # inlezen en controleren op data
        sys.stdout.flush()
        data = read_in()
        sys.stdout.flush()
        if data:
            inputArray = data
            blinkState = array_loop(inputArray)
            break
        # wanner de array op z'n max is begin  bij 1
        if i >= len(max(blink, key=len)):
               i = 1
        # volgende in de array na een halfe seconde
        if (time.time() - start) > 0.5:
            start = time.time()
            i += 1
        # loop door array
        for q in range(len(blink)):
            try:
                led_strip.setPixelColor(blink[q][0], blink[q][i])
            # bij exception begin bij 0
            except IndexError:
                led_strip.setPixelColor(blink[q][0], blink[q][1])
            # update led strip
            led_strip.show()
