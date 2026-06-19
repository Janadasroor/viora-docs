#!/usr/bin/env python3
import re
import sys
import os

def markdown_table_to_html(match):
    lines = match.group(0).strip().split('\n')
    
    # Parse header
    header_cells = [c.strip() for c in lines[0].split('|')[1:-1]]
    
    # Skip separator line (line 1)
    
    # Parse rows
    rows = []
    for line in lines[2:]:
        cells = [c.strip() for c in line.split('|')[1:-1]]
        rows.append(cells)
    
    html = '<table>\n  <thead>\n    <tr>'
    for cell in header_cells:
        html += f'<th>{cell}</th>'
    html += '</tr>\n  </thead>\n  <tbody>\n'
    
    for row in rows:
        html += '    <tr>'
        for cell in row:
            html += f'<td>{cell}</td>'
        html += '</tr>\n'
    
    html += '  </tbody>\n</table>'
    return html

def convert_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Match markdown tables (line starting with |, followed by separator |---|, then more | lines)
    pattern = r'(?:^|\n)(\|[^\n]+\|\n\|[-| ]+\|\n(?:\|[^\n]+\|\n?)+)'
    
    new_content = re.sub(pattern, lambda m: '\n' + markdown_table_to_html(m), content)
    
    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Converted: {filepath}")
    else:
        print(f"No tables: {filepath}")

if __name__ == '__main__':
    base_dir = '/home/jnd/JanadaSroor/viora-docs/src/app/docs'
    for root, dirs, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.mdx'):
                filepath = os.path.join(root, file)
                convert_file(filepath)
