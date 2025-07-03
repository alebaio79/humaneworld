import { SimpleEventDispatcher } from "strongly-typed-events";

export default class DonationFrequency {
  private _onFrequencyChange = new SimpleEventDispatcher<string>();
  private _frequency: string = "single";
  private _radios: string = "";

  constructor(radios: string) {
    this._radios = radios;
    // Watch the Radios for Changes
    document.addEventListener("change", (e: Event) => {
      const element = e.target as HTMLInputElement;
      if (element && element.name == radios) {
        if (element.type === "checkbox") {
          if (element.checked) {
            this.frequency = "Y";
          } else {
            this.frequency = "";
          }
        } else {
          this.frequency = element.value;
        }
      }
    });
  }

  get frequency(): string {
    return this._frequency;
  }

  // Every time we set a frequency, trigger the onFrequencyChange event.
  set frequency(value: string) {
    // Search for the current value in radios.
    let found = Array.from(
      document.querySelectorAll('input[name="' + this._radios + '"]')
    ).filter(
      el => el instanceof HTMLInputElement && el.value == value
    );
    
    // We found the value on the radio boxes, so check it
    if (found.length) {
      const frequencyField = found[0] as HTMLInputElement;
      frequencyField.click();
    }
    
    this._frequency = value == "Y" ? "monthly" : "single";
    this._onFrequencyChange.dispatch(this._frequency);
  }

  public get onFrequencyChange() {
    return this._onFrequencyChange.asEvent();
  }

  // Set frequency var with currently selected frequency.
  public load() {
    
    const currentFrequencyField = document.querySelector(
      'input[name="' + this._radios + '"]:checked'
    ) as HTMLInputElement;
    if (currentFrequencyField && currentFrequencyField.value) {
      this.frequency = currentFrequencyField.value;
    }
  }
}
