# \<uxl-autocomplete\>

##### What is?

It is a web component that allows you to create a autocomplete and customizable selector.

##### How Install

```
npm i --save @uxland/uxl-autocomplete
```

##### How to use?

import the component and use it in the html with the `uxl-autocomplete` tag

```
import "@uxland/uxl-autocomplete";

<body>
    <uxl-autocomplete></uxl-autocomplete>
</body>
```

### Attributes availables

| Attribute         | Description                                                       | Default                        |
| ----------------- | ----------------------------------------------------------------- | ------------------------------ |
| `id`              | id for uxl-autocomplete input                                     | `uxl-autocomplete` (string)    |
| `list`            | list of options available to select in the component              | `[]` (any[])                   |
| `trackBy`         | list of fields of the list items enabled to search by them        | `["value", "name"]` (string[]) |
| `labels`          | list of fields enabled to be displayed in the list items          | `["value", "name"]` (string[]) |
| `placeholder`     | input placeholder                                                 | `Type to search` (string)      |
| `notFoundMessage` | message displayed when not finding results by the entered value   | `Elements not found` (string)  |
| `term`            | text entered in the input used to filter the elements of the list | `""` (string)                  |
| `value`           | the current value of the selected list item                       | `undefined` (any)              |
| `listIsVisible`   | allow show or hide the drop-down                                  | `false` (boolean)              |
| `maxItems`        | how many elements will be displayed as maximum in the drop-down   | `10` (number)                  |
| `disabled`        | if true the imput don't allow select any option                   | `false` (boolean)              |

### Styling

The following custom properties and mixins are available for styling:

| Custom property                                           | Description                                                | Default             |
| --------------------------------------------------------- | ---------------------------------------------------------- | ------------------- |
| **Input**                                                 |
| `--uxl-autocomplete-border-color`                         | Border styles of the input                                 | `1px solid #d8d8d8` |
| `--uxl-autocomplete--border-radius`                       | Border-radius of the input                                 | `4px`               |
| `--uxl-autocomplete-height`                               | Height of the input                                        | `32px`              |
| `--uxl-autocomplete-padding`                              | Padding of the input                                       | `8px`               |
| `--uxl-autocomplete-font-size`                            | Font size of the input                                     | `12px`              |
| `--uxl-autocomplete-color`                                | Color of the input text                                    | `#000000`           |
| `--uxl-autocomplete-font-weight`                          | Font-weigth of the input text                              | `500`               |
| `--uxl-autocomplete-disabled-opacity`                     | Opacity of the input when is disabled                      | `0.5`               |
| **Drop-down**                                             |
| `--uxl-autocomplete-drop-down-border`                     | Border styles of the drop-down                             | `1px solid #d8d8d8` |
| `--uxl-autocomplete-drop-down-padding`                    | Padding of the dropdown                                    | `16px`              |
| `--uxl-autocomplete-drop-down-list--max-height`           | Max heigth of the list                                     | `none`              |
| **Main element**                                          |
| `--uxl-autocomplete-drop-down-item-padding`               | Padding of the main element of the drop-down item          | `8px 0px`           |
| `--uxl-autocomplete-drop-down-item-font-size`             | Font size of the main element of the drop-down item        | `12px`              |
| `--uxl-autocomplete-drop-down-item-color`                 | Color text of the main element of the drop-down item       | `#000000`           |
| `--uxl-autocomplete-drop-down-item-font-weight`           | Font-weigth of the main element of the drop-down item      | `500`               |
| **Secondary element**                                     |
| `--uxl-autocomplete-drop-down-secondary-item-padding`     | Padding of the secondary element of the drop-down item     | `8px 0px`           |
| `--uxl-autocomplete-drop-down-secondary-item-font-size`   | Font size of the secondary element of the drop-down item   | `12px`              |
| `--uxl-autocomplete-drop-down-secondary-item-color`       | Color text of the secondary element of the drop-down item  | `#979797`           |
| `--uxl-autocomplete-drop-down-secondary-item-font-weight` | Font-weight of the secondary element of the drop-down item | `300`               |
| **Matching text**                                         |
| `--uxl-autocomplete-drop-down-hightlight-font-weigth`     | Font-weigth of the text matching the search                | `600`               |
| `--uxl-autocomplete-drop-down-hightlight-color`           | Color of the text matching the search                      | `#000000`           |
| **Not found text**                                        |
| `--uxl-autocomplete-not-found-padding`                    | Padding of the not found message container                 | `8px 0px`           |
| `--uxl-autocomplete-not-found-font-size`                  | Font size of the not found message                         | `12px`              |
| `--uxl-autocomplete-not-found-color`                      | Color of the not found message                             | `#000000`           |
| `--uxl-autocomplete-not-found-font-weight`                | Font-weight of not found message                           | `500`               |
