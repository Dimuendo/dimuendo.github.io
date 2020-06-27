from PIL import Image
import os

imageFolder = './traits/'
images = os.listdir(imageFolder)

for png in images:
    name, extension = os.path.splitext(png)
    if extension == '.png':
        im = Image.open(imageFolder + png)
        rgbImage = im.convert('RGB')
        rgbImage.save(imageFolder + name + '.jpg')
