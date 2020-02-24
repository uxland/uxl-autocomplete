import { html } from "lit-element/lit-element";
import { cache } from "lit-html/directives/cache";
import { classMap } from "lit-html/directives/class-map";
import { repeat } from "lit-html/directives/repeat";
import { UxlAutocomplete } from "./uxl-autocomplete";

export const template = (props: UxlAutocomplete) => html`
  <div class="wrapper" part="wrapper">
    <input
      type="text"
      id="${props.id}"
      class="input"
      .placeholder="${props.placeholder}"
      .disabled="${props.disabled}"
      .value="${props.term}"
      part="input"
    />
    <div class="track ${classMap({ hidden: !props.listIsVisible })}" part="track">
      ${cache(
        props.hasResults
          ? html`
              <div class="track__list" part="track__list">
                ${repeat(
                  props.filteredList,
                  (item) => html`
                    <div class="track__list-item" data-item="${JSON.stringify(item)}" part="track__list-item">
                      ${props.formatFields(item)}
                    </div>
                  `
                )}
              </div>
            `
          : html`
              <div class="not-found" part="not-found">
                <div class="not-found__message" part="not-found__message">
                  ${props.notFoundMessage}
                </div>
              </div>
            `
      )}
    </div>
  </div>
`;
