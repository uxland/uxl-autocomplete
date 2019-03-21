import { listen, propertiesObserver } from "@uxland/uxl-utilities";
import { css, customElement, html, LitElement, property, query, unsafeCSS } from "lit-element";
import { __, always, filter, ifElse, isEmpty, pipe, props, take, test } from "ramda";
import * as styles from "./styles.scss";
import { template } from "./template";

const matches = (trackBy: string[], list: any[] = [], maxItems: number) => {
  const defValue = always([]);
  const normalizeValues = (props: string[]) => {
    props.forEach((prop: string, index: number) => {
      props[index] = normalizeString(prop);
    });
    return props;
  };
  const mathesPredicate = (term: string) =>
    pipe(
      props(trackBy),
      normalizeValues,
      test(new RegExp(normalizeString(term), "i"))
    );
  const takeMaxItems = listFilter => take(maxItems, listFilter);
  const listFilter = pipe(
    mathesPredicate,
    filter(__, list),
    takeMaxItems
  );
  return ifElse(isEmpty, defValue, listFilter);
};

const normalizeString = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const capitalizeFirstChar = (text: string) =>
  `${text
    .toLowerCase()
    .charAt(0)
    .toLocaleUpperCase()}${this.term.toLowerCase().slice(1)}`;
// @ts-ignore
@customElement("uxl-autocomplete")
export class UxlAutocomplete extends propertiesObserver(LitElement) {
  public get hasResults() {
    return this.term.length > 2 && this.filteredList && this.filteredList.length > 0;
  }

  private static get styles() {
    return css`
      ${unsafeCSS(styles)}
    `;
  }
  @property()
  public id: string = "uxl-autocomplete";

  @property()
  public list: any;

  @property()
  public trackBy: string[] = ["value", "name"];

  @property()
  public labels: string[] = ["name", "value"];

  @property()
  public placeholder: string = "Type to search";

  @property()
  public notFoundMessage: string = "Elements not found";

  @query("#uxl-autocomplete")
  public input: HTMLElement;

  @property()
  public term: string = "";

  @property()
  public value: any;

  @property()
  public listIsVisible: boolean = false;

  @property()
  public maxItems: number = 10;

  @property()
  public disabled: boolean = false;

  public filteredList: any[];

  private fitlerItems: (term: string) => any[];

  private clickHandler: any;

  @listen("input", "#uxl-autocomplete")
  public onChange(e) {
    this.term = e.currentTarget.value;
    this.listIsVisible = true;
  }

  public formatFields(item: any) {
    return pipe(
      this.getLabelsValue.bind(this),
      this.createListItemElement.bind(this)
    )(item);
  }

  public getLabelsValue(item: any): string {
    let format = "";
    this.labels.forEach((label: string, index: number) => {
      if (index === 0) {
        format = format.concat(`<span class="main-label">${this.highlightSeachedTerm(item[label])}</span> `);
      } else {
        format = format.concat(`<span class="secondary-label">${this.highlightSeachedTerm(item[label])}</span>`);
      }
    });
    return format;
  }

  public highlightSeachedTerm(labelText: string) {
    if (
      normalizeString(labelText)
        .toLowerCase()
        .includes(normalizeString(this.term).toLowerCase())
    ) {
      let copyTerm = this.term;
      if (
        normalizeString(labelText)
          .toLowerCase()
          .indexOf(normalizeString(this.term).toLowerCase()) === 0
      ) {
        copyTerm = `${this.term
          .toLowerCase()
          .charAt(0)
          .toLocaleUpperCase()}${this.term.toLowerCase().slice(1)}`;
      }
      return normalizeString(labelText)
        .toLowerCase()
        .replace(normalizeString(this.term).toLowerCase(), `<span class="highlight">${copyTerm}</span>`);
    }
    return labelText;
  }

  public createListItemElement(format: string) {
    const element = document.createElement("div");
    element.classList.add("track__list-item-container");
    element.innerHTML = format;
    return element;
  }
  public connectedCallback() {
    super.connectedCallback();
    this.clickHandler = this.onClick.bind(this);
    document.addEventListener("click", this.clickHandler);
  }

  public desconnectedCallback() {
    super.desconnectedCallback();
    document.removeEventListener("click", this.clickHandler);
  }

  public onClick(e) {
    this.ifListItem(e) ? this.setValueItem(e) : this.hideDropDown();
  }

  @listen("click", ".disable-button")
  public _onClickDisabled() {
    this.disabled = !this.disabled;
  }

  private ifListItem(e) {
    return e.path[0].className === "track__list-item";
  }

  private setValueItem(e) {
    this.value = JSON.parse(e.path[0].getAttribute("data-item"));
  }

  private hideDropDown() {
    this.listIsVisible = false;
  }

  private render() {
    return html`
      ${template(this)}
    `;
  }

  private termChanged() {
    const onTermChanged = new CustomEvent("uxl-autocomplete-term-changed", {
      composed: true,
      detail: { term: this.term }
    });
    this.dispatchEvent(onTermChanged);
    this.filteredList = this.fitlerItems ? this.fitlerItems(this.term) : [];
  }

  private setFilterItems() {
    this.fitlerItems = matches(this.trackBy, this.list, this.maxItems);
  }

  private valueChanged() {
    if (this.value) {
      const onValueChanged = new CustomEvent("uxl-autocomplete-value-changed", {
        composed: true,
        detail: { value: this.value }
      });
      this.dispatchEvent(onValueChanged);
      this.term = this.value[this.labels[0]];
      (this.input as any).value = `${this.term
        .toLowerCase()
        .charAt(0)
        .toLocaleUpperCase()}${this.term.toLowerCase().slice(1)}`;
      this.listIsVisible = false;
    }
  }

  private listChanged() {
    const onListChanged = new CustomEvent("uxl-autocomplete-list-changed", {
      composed: true,
      detail: { list: this.list }
    });
    this.dispatchEvent(onListChanged);
    this.setFilterItems();
  }

  private trackByChanged() {
    const onTrackByChanged = new CustomEvent("uxl-autocomplete-trackBy-changed", {
      composed: true,
      detail: { trackBy: this.trackBy }
    });
    this.dispatchEvent(onTrackByChanged);
    this.setFilterItems();
  }

  private listIsVisibleChanged() {
    const onListIsVisibleChange = new CustomEvent("uxl-autocomplete-listIsVisible-changed", {
      composed: true,
      detail: { listIsVisible: this.listIsVisible }
    });
    this.dispatchEvent(onListIsVisibleChange);
  }

  private disabledChanged() {
    const onDisableChanged = new CustomEvent("uxl-autocomplete-disabled-changed", {
      composed: true,
      detail: { disabled: this.disabled }
    });
    this.dispatchEvent(onDisableChanged);
    this.disabled ? this.clearValues() : undefined;
  }

  private clearValues() {
    this.value = undefined;
    this.term = "";
    (this.input as any).value = "";
  }
}
