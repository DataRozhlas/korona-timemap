# %%
import requests
import pandas as pd
import requests
from xml.etree import ElementTree
import json

# %%
tbl_url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR9hmc53qUYVnptZqY47La2rimLe9pEeeHtjNSn0Xc_qgxcDvBJAl5yAoI7pmLw4EbJmQdSgEw-BcBI/pub?gid=0&single=true&output=csv'
d = pd.read_csv(tbl_url)

# %%
da = d.values.tolist()
for row in da:
    r = requests.get('https://api.mapy.cz/geocode?query=' + row[1])
    tree = ElementTree.fromstring(r.content)
    row.extend([tree[0][0].attrib['x'], tree[0][0].attrib['y']])

#%%
out = {}
for row in da:
    if row[0] not in out:
        out[row[0]] = []
    out[row[0]].append(row[1:])

# %%
with open('./data.js', 'w', encoding='utf-8') as f:
    f.write('const coronaData = ' + json.dumps(out, ensure_ascii=False) + ';')

# %%

