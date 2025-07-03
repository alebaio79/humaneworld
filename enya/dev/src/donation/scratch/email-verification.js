// When email verification is enabled, the email field could have a value of
    // true for validity.valid but still not be acceptable.
    } else if (
      field.classList.contains("en__field--emailAddress") &&
      state.thisPage.isEmailVerificationActive
    ) {
      // We need to explicitly check for a false value here, because if the call
      // to FreshAddress did not succeed at all, this value will be undefined,
      // not false.
      console.log("emailVerifier.result: %o", emailVerifier.result);
      if (emailVerifier.result.isVerified === false) {
        console.log("email verification is active and this email cannot be verified.");
        processInvalidField(field);
      } else {
        console.log(
          "email verification is active and this email can be verified."
        );
        processValidField(field);
      }