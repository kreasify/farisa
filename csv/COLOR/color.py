#!/usr/bin/env python3
"""
The csv file must contain a "title" column and any main content should be in a "body" column.
"""

import csv
import re
import unicodedata
import datetime
import os

from pathlib import Path

# Set the path to the source CSV file.
source = Path('color.csv')


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
            print(f'{key}: {value}', file=file)
        elif key != 'body' and key == 'description':
            print(f'{key}: "warna {value}"\ndate: ' + time() + '+07:00', file=file)
        elif key != 'body' and key == 'name' and value != '':
            print(f'menu:\n  main:\n    name: {value}', file=file)
        elif key != 'body' and key == 'weight' and value != '':
            print(f'    weight: {value}', file=file)
        elif key != 'body' and key == 'parent' and value != '':
            print(f'    parent: {value}', file=file)
        elif key != 'body' and key == 'label' and value != '':
            print(f'    params:\n      label: {value}', file=file)
        elif key != 'body' and key == 'class' and value != '':
            print(f'      class: {value}', file=file)
        elif key != 'body' and value != '':
            print(f'{key}: {value}', file=file)
    print('sections:', file=file)
    print('  - type: hero_section', file=file)
    print('    template: hero_section', file=file)
    for key, value in row.items():
        if key != 'body' and key == 'title':
            print(f'    title: Warna {value}', file=file)
    print('    align: center', file=file)
    print('    has_background: true', file=file)
    print('    background:', file=file)
    print('      background_color: gray', file=file)
    print('---\n', file=file)
    if 'body' in row:
        print(row['body'], file=file)

def main():
    csv_file = open(source, newline='')
    csv_content = csv.DictReader(csv_file)
    for row in csv_content:
        filename = slugify(row['title'])
        fileku = Path(f'{filename}/_index.md')
        if not os.path.exists(filename):
            os.makedirs(filename)
            if not fileku.is_file():
                write(fileku, row)

if __name__ == '__main__':
    main()