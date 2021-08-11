#!/usr/bin/env python3
"""
The csv file must contain a "title" column and any main content should be in a "body" column.
"""

import csv
import re
import unicodedata
import datetime

from pathlib import Path

# Set the path to the source CSV file.
source = Path('shop.csv')


def slugify(value):
    value = str(value)
    value = unicodedata.normalize('NFKD', value).encode('ascii', 'ignore').decode('ascii')
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    return re.sub(r'[-\s]+', '-', value)

def time():
    value = datetime.datetime.now()
    return value.strftime("%Y-%m-%dT%H:%M:%S%z")

def write(path, row):
    file = open(path, 'w')
    print('---', file=file)
    for key, value in row.items():
        if key != 'body' and key == 'title':
            print(f'{key}: {value}\nslug: ' + slugify({value}), file=file)
        elif key != 'body' and key == 'description':
            print(f'{key}: "{value}"\ndate: ' + time() + '+07:00', file=file)
        elif key != 'body' and (key == 'tags' or key == 'collections'):
            print(f'{key}: {value}', file=file)  
        elif key != 'body' and (key == 'brand' or key == 'color'):
            print(f'{key}:\n  - {value}', file=file)  
        elif key != 'body' and key == 'image_1':
            print(f'images:\n  - image: {value}', file=file)
        elif key != 'body' and (key == 'image_2' or key == 'image_3' or key == 'image_4' or key == 'image_5' or key == 'image_6' or key == 'image_7' or key == 'image_8') and value != '':
            print(f'  - image: {value}', file=file)
        elif key != 'body' and ((key == 'hijabenka' and value != '') or (key == 'berrybenka'  and value != '') or (key == 'lazada'  and value != '') or (key == 'shopee'  and value != '') or (key == 'tokopedia'  and value != '') or (key == 'bukalapak'  and value != '') or (key == 'blibli'  and value != '')):
            print(f'marketplace:\n  {key}: {value}', file=file)
        elif key != 'body' and key == 'size_1' and value != '':
            print(f'variants:\n  - name: {value}\n    size: {value}', file=file)
        elif key != 'body' and key == 'sku_1' and value != '':
            print(f'    sku: {value}', file=file)
        elif key != 'body' and key == 'price_1' and value != '':
            print(f'    price: {value}', file=file)
        elif key != 'body' and key == 'discount_1' and value != '':
            print(f'    discount: {value}', file=file)
        elif key != 'body' and key == 'weight_1' and value != '':
            print(f'    weight: {value}', file=file)
        elif key != 'body' and key == 'quantity_1' and value != '':
            print(f'    quantity: {value}', file=file)
        elif key != 'body' and key == 'size_2' and value != '':
            print(f'  - name: {value}\n    size: {value}', file=file)
        elif key != 'body' and key == 'sku_2' and value != '':
            print(f'    sku: {value}', file=file)
        elif key != 'body' and key == 'price_2' and value != '':
            print(f'    price: {value}', file=file)
        elif key != 'body' and key == 'discount_2' and value != '':
            print(f'    discount: {value}', file=file)
        elif key != 'body' and key == 'weight_2' and value != '':
            print(f'    weight: {value}', file=file)
        elif key != 'body' and key == 'quantity_2' and value != '':
            print(f'    quantity: {value}', file=file)
        elif key != 'body' and key == 'size_3' and value != '':
            print(f'  - name: {value}\n    size: {value}', file=file)
        elif key != 'body' and key == 'sku_3' and value != '':
            print(f'    sku: {value}', file=file)
        elif key != 'body' and key == 'price_3' and value != '':
            print(f'    price: {value}', file=file)
        elif key != 'body' and key == 'discount_3' and value != '':
            print(f'    discount: {value}', file=file)
        elif key != 'body' and key == 'weight_3' and value != '':
            print(f'    weight: {value}', file=file)
        elif key != 'body' and key == 'quantity_3' and value != '':
            print(f'    quantity: {value}', file=file)
        elif key != 'body' and key == 'size_4' and value != '':
            print(f'  - name: {value}\n    size: {value}', file=file)
        elif key != 'body' and key == 'sku_4' and value != '':
            print(f'    sku: {value}', file=file)
        elif key != 'body' and key == 'price_4' and value != '':
            print(f'    price: {value}', file=file)
        elif key != 'body' and key == 'discount_4' and value != '':
            print(f'    discount: {value}', file=file)
        elif key != 'body' and key == 'weight_4' and value != '':
            print(f'    weight: {value}', file=file)
        elif key != 'body' and key == 'quantity_4' and value != '':
            print(f'    quantity: {value}', file=file)
        elif key != 'body' and value != '':
            print(f'{key}: {value}', file=file)
    print('---\n', file=file)
    if 'body' in row:
        print(row['body'], file=file)

def main():
    csv_file = open(source, newline='')
    csv_content = csv.DictReader(csv_file)
    for row in csv_content:
        filename = slugify(row['title'])
        path = Path(f'{filename}.md')
        if not path.is_file():
            write(path, row)

if __name__ == '__main__':
    main()