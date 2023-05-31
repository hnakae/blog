---
title: "Svg Sgf Viewer"
date: 2023-05-30T23:26:11-07:00
draft: false
---

# repo: https://github.com/hnakae/go-blog-flask-api

```python
# Path to your SGF file
sgf_file_path = "./sgf/example-game.sgf"

# Parse SGF File
with open(sgf_file_path, 'r', encoding='utf-8') as file:
    sgf_content = file.read()

# Extract the moves using regular expressions
move_regex = re.compile(r";[BW]\[[a-z]{0,2}\]")
moves = move_regex.findall(sgf_content)

# Clean up the moves and remove unnecessary characters
clean_moves = [move.strip(";").replace("B[", "").replace("W[", "").replace("]","") for move in moves]

# Print the extracted moves
for move in clean_moves:
    print(move)
```

# output:

dd
pd
dp
pp
fc
pj
jj

# convert into svg coordinates

```python
def translate_letter_to_cx_number(letter):
    alphabet = 'abcdefghijklmnopqrstuvwxyz'
    number = alphabet.index(letter) * 5 + 3
    return number

# Test the translation
letters = ['a', 'b', 'c', 't']
numbers = [translate_letter_to_number(letter) for letter in letters]
print(numbers)  # Output: [3, 8, 13, 93]

```

#

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 96 96">
<rect width="96" height="96" fill="#DCB35C"/>
<rect width="90" height="90" x="3" y="3" stroke="#000" stroke-width=".2" fill="none"/>
<path stroke="#000" stroke-width=".2" fill="none" d="m3,8h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90m0,5h-90m0,5h90"/>
<path stroke="#000" stroke-width=".2" fill="none" d="m8,3v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90m5,0v-90m5,0v90"/>
<path stroke="#000" stroke-width=".8" stroke-linecap="round" d="m18,78l0,0m30,0l0,0m30,0l0,0m0-30l0,0m-30,0l0,0m-30,0l0,0m0-30l0,0m30,0l0,0m30,0l0,0"/>

<!-- use svg coordinates to place black.png and white.png -->
  {{ range .Moves }}
    <image x="{{ .X }}" y="{{ .Y }}" xlink:href="{{ .ImageURL }}" width="{{ .Width }}" height="{{ .Height }}"/>
  {{ end }}

  <!-- Place markers at the intersections -->
  <circle cx="3" cy="3" r="1" fill="#000"/>
  <circle cx="8" cy="8" r="1" fill="#000"/>
  <circle cx="13" cy="13" r="1" fill="#000"/>
  <circle cx="13" cy="13" r="1" fill="#000"/>
  <circle cx="18" cy="18" r="1" fill="#000"/>
  <circle cx="23" cy="23" r="1" fill="#000"/>
  <circle cx="28" cy="28" r="1" fill="#000"/>
  <circle cx="33" cy="33" r="1" fill="#000"/>
  <circle cx="38" cy="38" r="1" fill="#000"/>
  <circle cx="43" cy="43" r="1" fill="#000"/>
  <circle cx="48" cy="48" r="1" fill="#000"/>
  <circle cx="53" cy="53" r="1" fill="#000"/>
  <circle cx="58" cy="58" r="1" fill="#000"/>
  <circle cx="63" cy="63" r="1" fill="#000"/>
  <circle cx="68" cy="68" r="1" fill="#000"/>
  <circle cx="73" cy="73" r="1" fill="#000"/>
  <circle cx="78" cy="78" r="1" fill="#000"/>
  <circle cx="83" cy="83" r="1" fill="#000"/>
  <circle cx="88" cy="88" r="1" fill="#000"/>
  <circle cx="93" cy="93" r="1" fill="#000"/>

 <!-- Arrow Buttons -->
  <polygon id="forward-button" points="86,45 71,30 71,60" fill="#000"/>
  <polygon id="backward-button" points="10,45 25,30 25,60" fill="#000"/>

</svg>

```

# add some script somewhere for clicking through moves (draft)

```javascript
// JavaScript code
document.addEventListener("DOMContentLoaded", function() {
  var moves = {{ .Moves | jsonify }};
  var currentIndex = 0;
  var forwardButton = document.getElementById("forward-button");
  var backwardButton = document.getElementById("backward-button");

  forwardButton.addEventListener("click", function() {
    if (currentIndex < moves.length - 1) {
      currentIndex++;
      displayMoves();
    }
  });

  backwardButton.addEventListener("click", function() {
    if (currentIndex > 0) {
      moves.pop();
      currentIndex--;
      displayMoves();
    }
  });

  function displayMoves() {
    // Clear the SVG board
    var svgBoard = document.querySelector("svg");
    while (svgBoard.firstChild) {
      svgBoard.firstChild.remove();
    }

    // Re-render the moves up to the current index
    for (var i = 0; i <= currentIndex; i++) {
      var move = moves[i];
      var image = document.createElementNS("http://www.w3.org/2000/svg", "image");
      image.setAttribute("x", move.X);
      image.setAttribute("y", move.Y);
      image.setAttribute("xlink:href", move.ImageURL);
      image.setAttribute("width", move.Width);
      image.setAttribute("height", move.Height);
      svgBoard.appendChild(image);
    }
  }
});

```

# how to do capture rules?
