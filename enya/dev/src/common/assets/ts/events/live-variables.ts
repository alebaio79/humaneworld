import state from "commonComponents/stateManager";

import DonationAmount from "./donation-amount";
import DonationFrequency from "./donation-frequency";

export default class LiveVariables {
  public _amount: DonationAmount;
  private _frequency: DonationFrequency;
  private multiplier: number = 1 / 12;

  constructor(submitLabel: string) {
    const form = state.thisPage.formObject;
    const amount = state.thisPage.amountObject;
    const frequency = state.thisPage.frequencyObject;

    if (!form || !amount || !frequency) return;

    this._amount = amount;
    this._frequency = frequency;
    amount.onAmountChange.subscribe(() => {
      this.changeSubmitButton(submitLabel);
    });
    amount.onAmountChange.subscribe(() => this.changeLiveAmount());
    frequency.onFrequencyChange.subscribe(() => this.changeLiveFrequency());
    frequency.onFrequencyChange.subscribe(() => {
      this.changeSubmitButton(submitLabel);
    });
    // Update the amount after the frequency changes.
    frequency.onFrequencyChange.subscribe(() =>
      amount.load()
    );
    form.onError.subscribe(() => this.changeSubmitButton(submitLabel));
  }

  private getAmountTxt(amount: number = 0) {
    let currency;
    if (!state.thisPage.selectedCurrency) {
      currency = "USD";
    } else {
      currency = state.thisPage.selectedCurrency;
    }
    const options = {
      style: "currency",
      currency: currency,
      currencyDisplay: "symbol",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    };

    let amountText = amount.toLocaleString(
      "en-US", 
      options 
    );

    // We don't want to show CA$ or A$, just $.
    amountText = amountText.replace(/C|A|U|S/g, '');
    return amount > 0 ? amountText.replace(/\D00$/, '') : "";
  }

  public changeSubmitButton(submitLabel: string) {
    const submit = document.querySelector(
      ".dynamic-giving-button"
    ) as HTMLButtonElement;
    if (!submit) return;

    if (state.thisPage.isFrench) {
      state.thisPage.submitLabel = "Faire un don";
      submitLabel = state.thisPage.submitLabel;
    }

    const amount = this.getAmountTxt(this._amount.amount);
    let frequencyText = this._frequency.frequency == "single" ? "" : " Monthly";
    if (state.thisPage.isFrench) {
      frequencyText = this._frequency.frequency == "single" ? "" : " mensuel";
    }

    let label =
      amount != ""
        ? submitLabel + " " + amount + frequencyText
        : submitLabel + " Now";
    
    if (state.thisPage.isFrench) {
      label = amount != ""
        ? submitLabel + frequencyText + " de " + amount
        : submitLabel + " maintenant";
    }

    submit.innerHTML = label;
  }

  public changeLiveAmount() {
    const value = this._amount.amount;
    const live_amount = document.querySelectorAll(".live-giving-amount");
    live_amount.forEach(elem => (elem.innerHTML = this.getAmountTxt(value)));
  }

  public changeLiveFrequency() {
    const live_frequency = document.querySelectorAll(".live-giving-frequency");
    live_frequency.forEach(
      elem =>
        (elem.innerHTML =
          this._frequency.frequency == "single" ? "" : "monthly")
    );
  }
}
