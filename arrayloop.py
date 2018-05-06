import time

LED_COUNT   = 9    # Number of LED pixels.
LED_PIN     = 21      # GPIO pin connected to the pixels (must support PWM!).
LED_FREQ_HZ = 800000  # LED signal frequency in hertz (usually 800khz)
LED_DMA     = 10       # DMA channel to use for generating signal (try 5)
LED_BRIGHTNESS = 80     # Set to 0 for darkest and 255 for brightest
LED_INVERT     = False   # True to invert the signal (when using NPN transistor level shift)
LED_CHANNEL    = 0       # set to '1' for GPIOs 13, 19, 41, 45 or 53


from neopixel import *

col = 3
row = 3
inputArray = [[Color(255,0,0),Color(0,255,0),Color(0,0,255)],
     [Color(0,255,10),[Color(0,255,0),Color(0,0,255)],Color(255,0,0)],
     [Color(150,0,150),Color(200,150,100),[Color(0,255,0),Color(0,0,255),Color(255,0,0)]],
     ]
blink = []


led_strip = Adafruit_NeoPixel(LED_COUNT, LED_PIN, LED_FREQ_HZ, LED_DMA, LED_INVERT, LED_BRIGHTNESS, LED_CHANNEL)
led_strip.begin()

def get_led_position(coll, pos_x, pos_y):
        if(pos_y % 2):
            index = (pos_y*coll)-(coll-pos_x)
        else:
            index = (pos_y*coll)-(pos_x-1)
        return index-1

def blink_loop():
    for q in range(len(blink)):
        for g in range(1,len(blink[q])):
            led_strip.setPixelColor(blink[q][0],blink[q][g]);
            led_strip.show();
            time.sleep(0.5)

def array_loop(inputArray):
    blinkcount = 0
    for x in range(col):
        for y in range(row):
            if(isinstance(inputArray[x][y], list)):
                blink.append([])
                blink[blinkcount].append(get_led_position(col, x, y))
                for k in range(len(inputArray[x][y])):
                    blink[blinkcount].append(inputArray[x][y][k])
                blinkcount += 1
            elif(isinstance(inputArray[x][y], int)):
                index = get_led_position(col, x, y)
                led_strip.setPixelColor(index,inputArray[x][y])
            else:
                print("Onjuiste Input")


array_loop(inputArray)
led_strip.show()
while(True):
    blink_loop()




