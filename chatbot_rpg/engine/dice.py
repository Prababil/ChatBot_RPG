import sys
import random 

def dice():
    return random.randint(1, 20)


sys.modules[__name__] = dice
