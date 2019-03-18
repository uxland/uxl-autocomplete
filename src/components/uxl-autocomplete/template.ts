import { html } from "lit-element/lit-element";
import { cache } from "lit-html/directives/cache";
import { classMap } from "lit-html/directives/class-map";
import { repeat } from "lit-html/directives/repeat";
import { UxlAutocomplete } from "./uxl-autocomplete";

export const template = (props: UxlAutocomplete) => html`
  <div class="wrapper">
    <input type="text" id="${props.id}" class="input" />
    <div class="track ${classMap({ hidden: !props.listIsVisible })}">
      ${cache(
        props.hasResults
          ? html`
              <div class="track__list">
                ${repeat(
                  props.filteredList,
                  item => html`
                    <div class="track__list-item" data-item="${JSON.stringify(item)}">
                      ${item[props.label]}
                    </div>
                  `
                )}
              </div>
            `
          : html`
              <div class="not-found">
                <div class="not-found__message">
                  ${props.notFoundMessage}
                </div>
              </div>
            `
      )}
    </div>
  </div>
`;
