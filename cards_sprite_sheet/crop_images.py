#I used Python 2.7 to test this.

from PIL import Image

img = Image.open("cards.png")
width=168
height=244

values = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king"]
values = [str(x) for x in values]  #make all values strings

suits= ["clubs", "diamonds", "hearts", "spades"]
combo = [[s + "_" + v for v in values] for s in suits] #combine the value & suit strings

combo.append(["joker1", "joker2", "backface"])

top_left = [0,0]
bottom_right = [width, height]
w_offset = 0
h_offset = 0

#Had to experiment with how to slice up this sprite sheet
#The cards are not all exactly the same widths, 
#the offsets add in some adjustment per row or column

for r in range(0, len(combo)):
    row = combo[r]

    if r > 0:
        h_offset = -1

    top_left[1]     += h_offset
    bottom_right[1] += h_offset       

    for c in range(0, len(row)):
        if c == 0:
            w_offset = 0
        elif c == 1:
            w_offset = -1
        elif c == 2:
            w_offset = -1
        elif c == 3:
            w_offset = 0
        elif c == 4:
            w_offset = -1
        elif c == 6:
            w_offset = -1
        elif c == 8:
            w_offset = -1
        else:
            w_offset = 0

        top_left[0]     += w_offset
        bottom_right[0] += w_offset      

        box = (top_left[0], top_left[1], bottom_right[0], bottom_right[1])        

        print(combo[r][c] + " -> box:" + str(box))
        img.crop(box).save("../card_images/" + combo[r][c] + ".png")

        top_left[0]     += width
        bottom_right[0] += width     

    
    # print("-------------------")    
    top_left[0] = 0
    top_left[1] += height
    
    bottom_right[0] = width
    bottom_right[1] += height

print ("Done")
    