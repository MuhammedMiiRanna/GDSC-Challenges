#

#

.appendChild()

innerHTML: The Element property innerHTML gets or sets the HTML or XML markup contained within the element. (all text contained by an element and all its child elements.)

- .outerHTML

- .innerText: take CSS styling into consideration
- .textContent: completely ignores any CSS styling
  The textContent property of the Node interface represents the text content of the node and its descendants. (all text contained by an element and all its children that are for formatting purposes only.)

- .firstChild
- .firstElementChild
- .parentElement

```
// create a brand new <span> element
const newSpan = document.createElement('span');

// select the first (main) heading of the page
const mainHeading = document.querySelector('h1');

// add the <span> element as the last child element of the main heading
mainHeading.appendChild(newSpan);
```

#

```
const myCustomDiv = document.createElement('div');

for (let i = 1; i <= 200; i++) {
    const newElement = document.createElement('p');
    newElement.textContent = 'This is paragraph number ' + i;

    myCustomDiv.appendChild(newElement);
}

document.body.appendChild(myCustomDiv);

myCustomDiv.addEventListener('click', respondToTheClick);
```

#

# Modifying an Element's Style Attribute

we can access an element's style attribute using the .style property!

```
const mainHeading = document.querySelector('h1');
mainHeading.style.color = 'red';
mainHeading.style.fontSize= 2rem;
```

PS: .style will show you the css rules applied to an element.

#

we can use the .style.cssText property to set multiple CSS styles at once!

```
const mainHeading = document.querySelector('h1');
mainHeading.style.cssText = 'color: blue; background-color: orange; font-size: 3.5em';
```

PS: with .cssText you can write css style as you would in a stylesheet (font-size instead of fontSize)
