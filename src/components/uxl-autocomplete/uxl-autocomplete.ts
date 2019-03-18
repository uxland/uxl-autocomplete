import { listen, propertiesObserver } from "@uxland/uxl-utilities";
import { css, customElement, html, LitElement, property, query, unsafeCSS } from "lit-element";
import { __, always, filter, ifElse, isEmpty, pipe, prop, test } from "ramda";
import * as styles from "./styles.scss";
import { template } from "./template";
const matches = (trackBy: string, list: any[] = []) => {
  const defValue = always([]);
  const mathesPredicate = (term: string) =>
    pipe(
      prop(trackBy),
      test(new RegExp(term, "i"))
    );
  const listFilter = pipe(
    mathesPredicate,
    filter(__, list)
  );
  return ifElse(isEmpty, defValue, listFilter);
};
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
  public trackBy: string = "value";

  @property()
  public label: string = "name";

  @property()
  public secondLabel: string = "value";

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

  public filteredList: any[];

  private fitlerItems: (term: string) => any[];
  private clickHandler: any;
  public connectedCallback() {
    super.connectedCallback();
    this.clickHandler = this.onClick.bind(this);
    document.addEventListener("click", this.clickHandler);
  }

  public desconnectedCallback() {
    super.desconnectedCallback();
    document.removeEventListener("click", this.clickHandler);
  }

  @listen("input", "#uxl-autocomplete")
  public onChange(e) {
    this.term = e.currentTarget.value;
    this.listIsVisible = true;
  }

  public onClick(e) {
    const ifListItem = e.path[0].className === "track__list-item";
    const setValue = (this.value = JSON.parse(e.path[0].getAttribute("data-item")));
    const hideDropDown = (this.listIsVisible = false);
    ifElse(ifListItem, setValue, hideDropDown);
  }

  private render() {
    return html`
      ${template(this)}
    `;
  }

  private termChanged() {
    this.filteredList = this.fitlerItems ? this.fitlerItems(this.term) : [];
  }
  private setFilterItems() {
    this.fitlerItems = matches(this.trackBy, this.list);
  }

  private valueChanged() {
    this.term = this.value[this.label];
    (this.input as any).value = this.term;
    this.listIsVisible = false;
  }

  private listChanged() {
    this.setFilterItems();
  }
  private trackByChanged() {
    this.setFilterItems();
  }
}
