import os

def to_camel_case(text):
    s = text.replace("-", " ").replace("_", " ")
    s = s.split()
    if len(text) == 0:
        return text
    return s[0].capitalize() + ''.join(i.capitalize() for i in s[1:])

for path, subdirs, files in os.walk("src/images"):
    for name in files:
        js_path = path.replace("src/", "@/")
        filename = to_camel_case(name.split("/")[-1].split(".")[0])
        print("import {} from \"{}/{}\"".format(filename,js_path, name))