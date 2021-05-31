/**
Handle errors from the injected script.
Errors may come from evaluating the JavaScript itself
or from the devtools framework.
See https://developer.mozilla.org/en-US/Add-ons/WebExtensions/API/devtools.inspectedWindow/eval#Return_value
*/
function handleError(error) {
  if (error.isError) {
    console.log(`Devtools error: ${error.code}`);
  } else {
    console.log(`JavaScript error: ${error.value}`);
  }
}

/**
Handle the result of evaluating the script.
If there was an error, call handleError.
*/
function handleResult(result) {
  if (result[1]) {
    handleError(result[1]);
  }
}

/**
Handle the result of evaluating the jQuery test script.
Log the result of the test, or
if there was an error, call handleError.
*/
function handlejQueryResult(result) {
  if (result[0] !== undefined) {
    console.log(`jQuery: ${result[0]}`);
  } else if (result[1]) {
    handleError(result[1]);
  }
}
/**
When the user clicks the 'jquery' button,
evaluate the jQuery script.
*/
// const checkjQuery = "typeof jQuery != 'undefined'";
// document.getElementById("button_jquery").addEventListener("click", () => {
//   chrome.devtools.inspectedWindow.eval(checkjQuery)
//     .then(handlejQueryResult);
// });   
/**
When the user clicks each of the first three buttons,
evaluate the corresponding script.
*/
// const evalString = "$0.style.backgroundColor = 'red'";
// document.getElementById("button_background").addEventListener("click", () => {
//   chrome.devtools.inspectedWindow.eval(evalString)
//     .then(handleResult);
// });

// const inspectString = "console.log(document.querySelector('h1'))"
const inspectString = `
const videos = [
  {
    "video_id": "NV0xDprLUBo",
    "track": "CK0BEJQ1GAAiEwi7st78m9vwAhXTQOAKHaevBUdAmqCt1umhzK41"
  },
  {
    "video_id": "fLykVLxgeHU",
    "track": "CKkBEJQ1GAEiEwi7st78m9vwAhXTQOAKHaevBUdA9fCB48uKqd58"
  },
  {
    "video_id": "CEpUvj8KfqA",
    "track": "CKUBEJQ1GAIiEwi7st78m9vwAhXTQOAKHaevBUdAoP2p-OOXlaUI"
  },
  {
    "video_id": "Nsy4hHCW_rw",
    "track": "CKEBEJQ1GAMiEwi7st78m9vwAhXTQOAKHaevBUdAvP3bhMeQruY2"
  },
  {
    "video_id": "lcGZIUqpjOs",
    "track": "CJ0BEJQ1GAQiEwi7st78m9vwAhXTQOAKHaevBUdA65mm1ZSk5uCVAQ=="
  },
  {
    "video_id": "opBPc2ea9rs",
    "track": "CJkBEJQ1GAUiEwi7st78m9vwAhXTQOAKHaevBUdAu-3rvLbuk8iiAQ=="
  },
  {
    "video_id": "wlbsdMbmjk8",
    "track": "CJUBEJQ1GAYiEwi7st78m9vwAhXTQOAKHaevBUdAz5yat8yOu6vCAQ=="
  },
  {
    "video_id": "whs3xlmWmLk",
    "track": "CJEBEJQ1GAciEwi7st78m9vwAhXTQOAKHaevBUdAubHazOX4zY3CAQ=="
  },
  {
    "video_id": "ed2q1HJALWY",
    "track": "CI0BEJQ1GAgiEwi7st78m9vwAhXTQOAKHaevBUdA5tqAksfa6u55"
  },
  {
    "video_id": "UzfYrWi0Ajg",
    "track": "CIkBEJQ1GAkiEwi7st78m9vwAhXTQOAKHaevBUdAuITQxdaV9ptT"
  },
  {
    "video_id": "DarIxEGxzao",
    "track": "CIUBEJQ1GAoiEwi7st78m9vwAhXTQOAKHaevBUdAqpvHjcSYstUN"
  },
  {
    "video_id": "6f1oH9-tM5I",
    "track": "CIEBEJQ1GAsiEwi7st78m9vwAhXTQOAKHaevBUdAkue0_f2D2v7pAQ=="
  },
  {
    "video_id": "xfykSI19MG8",
    "track": "CH0QlDUYDCITCLuy3vyb2_ACFdNA4Aodp68FR0Dv4PTriImp_sUB"
  },
  {
    "video_id": "_JFq3fbdLh0",
    "track": "CHkQlDUYDSITCLuy3vyb2_ACFdNA4Aodp68FR0Cd3PS239vayPwB"
  },
  {
    "video_id": "aNYeVZVzwMc",
    "track": "CHUQlDUYDiITCLuy3vyb2_ACFdNA4Aodp68FR0DHgc-r2cqH62g="
  },
  {
    "video_id": "1s7szDfd2eE",
    "track": "CHEQlDUYDyITCLuy3vyb2_ACFdNA4Aodp68FR0Dhs_e-w5m759YB"
  },
  {
    "video_id": "bJymsP6rB-o",
    "track": "CG0QlDUYECITCLuy3vyb2_ACFdNA4Aodp68FR0Dqj6z1j9apzmw="
  },
  {
    "video_id": "5xEButb7uro",
    "track": "CGkQlDUYESITCLuy3vyb2_ACFdNA4Aodp68FR0C69e63rbfAiOcB"
  },
  {
    "video_id": "ycjKdc8dOhY",
    "track": "CGUQlDUYEiITCLuy3vyb2_ACFdNA4Aodp68FR0CW9PT43M6y5MkB"
  },
  {
    "video_id": "zwNU39dyzY4",
    "track": "CGEQlDUYEyITCLuy3vyb2_ACFdNA4Aodp68FR0COm8u7_ZvVgc8B"
  },
  {
    "video_id": "MuRJWILcXLg",
    "track": "CF0QlDUYFCITCLuy3vyb2_ACFdNA4Aodp68FR0C4ufGWiKuS8jI="
  },
  {
    "video_id": "7QLcFtX0otU",
    "track": "CFkQlDUYFSITCLuy3vyb2_ACFdNA4Aodp68FR0DVxdKv7YK3ge0B"
  },
  {
    "video_id": "jxCJhBHtM3E",
    "track": "CFUQlDUYFiITCLuy3vyb2_ACFdNA4Aodp68FR0Dx5rSPwbCiiI8B"
  },
  {
    "video_id": "9S4mefKAwI0",
    "track": "CFEQlDUYFyITCLuy3vyb2_ACFdNA4Aodp68FR0CNgYOUn8-Jl_UB"
  },
  {
    "video_id": "bjqDpAqXsvk",
    "track": "CE0QlDUYGCITCLuy3vyb2_ACFdNA4Aodp68FR0D55d7UwPSgnW4="
  },
  {
    "video_id": "tylvVi0lOVE",
    "track": "CEkQlDUYGSITCLuy3vyb2_ACFdNA4Aodp68FR0DR8pTp4urblLcB"
  },
  {
    "video_id": "kG4sLYOpfAM",
    "track": "CEUQlDUYGiITCLuy3vyb2_ACFdNA4Aodp68FR0CD-KWd2IWLt5AB"
  },
  {
    "video_id": "FXQa3vlZOHw",
    "track": "CEEQlDUYGyITCLuy3vyb2_ACFdNA4Aodp68FR0D88OTK79uGuhU="
  },
  {
    "video_id": "5xegoGx4s0A",
    "track": "CD0QlDUYHCITCLuy3vyb2_ACFdNA4Aodp68FR0DA5uLjhpToi-cB"
  },
  {
    "video_id": "6SwhcAxIQEU",
    "track": "CDkQlDUYHSITCLuy3vyb2_ACFdNA4Aodp68FR0DFgKHigK6IlukB"
  },
  {
    "video_id": "bd4co_Fiwtw",
    "track": "CHUQlDUYACITCIKcwv-b2_ACFdTTEQgdBLcA4kDchYuLv5SH720="
  },
  {
    "video_id": "kX8cfrAdMJs",
    "track": "CHEQlDUYASITCIKcwv-b2_ACFdTTEQgdBLcA4kCb4fSA64_Hv5EB"
  },
  {
    "video_id": "0ZSfZOYKcHY",
    "track": "CG0QlDUYAiITCIKcwv-b2_ACFdTTEQgdBLcA4kD24KmwzuynytEB"
  },
  {
    "video_id": "Empua5a_y6A",
    "track": "CGkQlDUYAyITCIKcwv-b2_ACFdTTEQgdBLcA4kCgl_-1uc2btRI="
  },
  {
    "video_id": "IVjSOCnjdEI",
    "track": "CGUQlDUYBCITCIKcwv-b2_ACFdTTEQgdBLcA4kDC6I3Pgse0rCE="
  },
  {
    "video_id": "5OI8lOOIzgk",
    "track": "CGEQlDUYBSITCIKcwv-b2_ACFdTTEQgdBLcA4kCJnKOczpKP8eQB"
  },
  {
    "video_id": "8B64FJlgvSg",
    "track": "CF0QlDUYBiITCIKcwv-b2_ACFdTTEQgdBLcA4kCo-oLLyYKuj_AB"
  },
  {
    "video_id": "BM7nhvAMRbU",
    "track": "CFkQlDUYByITCIKcwv-b2_ACFdTTEQgdBLcA4kC1i7GA7_C55wQ="
  },
  {
    "video_id": "49oznKZtjUM",
    "track": "CFUQlDUYCCITCIKcwv-b2_ACFdTTEQgdBLcA4kDDmrazyvOM7eMB"
  },
  {
    "video_id": "-4nzaoHgJxE",
    "track": "CFEQlDUYCSITCIKcwv-b2_ACFdTTEQgdBLcA4kCRzoCPqO38xPsB"
  },
  {
    "video_id": "5WKcUO8apPQ",
    "track": "CE0QlDUYCiITCIKcwv-b2_ACFdTTEQgdBLcA4kD0yer4joqnseUB"
  },
  {
    "video_id": "g0pWSu-F7bU",
    "track": "CEkQlDUYCyITCIKcwv-b2_ACFdTTEQgdBLcA4kC125f8rsmVpYMB"
  },
  {
    "video_id": "6Sa_DXvvoG0",
    "track": "CEUQlDUYDCITCIKcwv-b2_ACFdTTEQgdBLcA4kDtwL7f1-Gvk-kB"
  },
  {
    "video_id": "_j_-bVWuiPw",
    "track": "CEEQlDUYDSITCIKcwv-b2_ACFdTTEQgdBLcA4kD8kbqt1c3_n_4B"
  },
  {
    "video_id": "fb0RfivYC7k",
    "track": "CD0QlDUYDiITCIKcwv-b2_ACFdTTEQgdBLcA4kC5l-De4q_E3n0="
  },
  {
    "video_id": "86ahPs3oX5I",
    "track": "CDkQlDUYDyITCIKcwv-b2_ACFdTTEQgdBLcA4kCSv6Hv7Keo0_MB"
  },
  {
    "video_id": "mfRCRhX35OE",
    "track": "CDUQlDUYECITCIKcwv-b2_ACFdTTEQgdBLcA4kDhyd-v4ciQ-pkB"
  },
  {
    "video_id": "Tq1r8BBkPok",
    "track": "CDEQlDUYESITCIKcwv-b2_ACFdTTEQgdBLcA4kCJ_ZCDgf7a1k4="
  },
  {
    "video_id": "mKDOu3RiBl4",
    "track": "CC0QlDUYEiITCIKcwv-b2_ACFdTTEQgdBLcA4kDejIijt9ez0JgB"
  },
  {
    "video_id": "Lm1tpZMT388",
    "track": "CCkQlDUYEyITCIKcwv-b2_ACFdTTEQgdBLcA4kDPv8-Y2bTbti4="
  },
  {
    "video_id": "oqbChbB_ANo",
    "track": "CCUQlDUYFCITCIKcwv-b2_ACFdTTEQgdBLcA4kDagfyD29Cw06IB"
  },
  {
    "video_id": "j5dXyS3K-ak",
    "track": "CCEQlDUYFSITCIKcwv-b2_ACFdTTEQgdBLcA4kCp86vukvnVy48B"
  },
  {
    "video_id": "q5hCoWQEu1E",
    "track": "CB0QlDUYFiITCIKcwv-b2_ACFdTTEQgdBLcA4kDR9pKgltSQzKsB"
  },
  {
    "video_id": "NK4BjYE4YJs",
    "track": "CBkQlDUYFyITCIKcwv-b2_ACFdTTEQgdBLcA4kCbweGJ2LGA1zQ="
  },
  {
    "video_id": "m_kO7TjhcnM",
    "track": "CBUQlDUYGCITCIKcwv-b2_ACFdTTEQgdBLcA4kDz5IXH093D_JsB"
  },
  {
    "video_id": "mLOKobipqUo",
    "track": "CBEQlDUYGSITCIKcwv-b2_ACFdTTEQgdBLcA4kDK0qbFm9Ti2ZgB"
  },
  {
    "video_id": "6WXtJurzEnc",
    "track": "CA0QlDUYGiITCIKcwv-b2_ACFdTTEQgdBLcA4kD3pMzX7qT7sukB"
  },
  {
    "video_id": "EYDFxEBVnzE",
    "track": "CAkQlDUYGyITCIKcwv-b2_ACFdTTEQgdBLcA4kCxvtaCxLixwBE="
  },
  {
    "video_id": "GdvRo6EKkFc",
    "track": "CAUQlDUYHCITCIKcwv-b2_ACFdTTEQgdBLcA4kDXoKqIurT07Rk="
  },
  {
    "video_id": "Ce4ot2bztc0",
    "track": "CAEQlDUYHSITCIKcwv-b2_ACFdTTEQgdBLcA4kDN68639paK9wk="
  },
  {
    "video_id": "dBM1_7WIq3Y",
    "track": "CHUQlDUYACITCMf1loGc2_ACFZMD4AodVHMPR0D21qKs-7_NiXQ="
  },
  {
    "video_id": "8ax6Ah2gLPs",
    "track": "CHEQlDUYASITCMf1loGc2_ACFZMD4AodVHMPR0D72YDtocCe1vEB"
  },
  {
    "video_id": "I5fk_tASEMM",
    "track": "CG0QlDUYAiITCMf1loGc2_ACFZMD4AodVHMPR0DDociA7Z_5yyM="
  },
  {
    "video_id": "lObq1pSfeGo",
    "track": "CGkQlDUYAyITCMf1loGc2_ACFZMD4AodVHMPR0Dq8P2k6dq685QB"
  },
  {
    "video_id": "47uMjsBJRng",
    "track": "CGUQlDUYBCITCMf1loGc2_ACFZMD4AodVHMPR0D4jKWC7JHj3eMB"
  },
  {
    "video_id": "LrGdeyangM0",
    "track": "CGEQlDUYBSITCMf1loGc2_ACFZMD4AodVHMPR0DNgZ61sq_n2C4="
  },
  {
    "video_id": "S7RjH4Moog0",
    "track": "CF0QlDUYBiITCMf1loGc2_ACFZMD4AodVHMPR0CNxKKZ-OOY2ks="
  },
  {
    "video_id": "uyC5gAJXCNY",
    "track": "CFkQlDUYByITCMf1loGc2_ACFZMD4AodVHMPR0DWkdySgLCukLsB"
  },
  {
    "video_id": "_1fzUWE1JsE",
    "track": "CFUQlDUYCCITCMf1loGc2_ACFZMD4AodVHMPR0DBzdSJlur8q_8B"
  },
  {
    "video_id": "qom2cLATR6w",
    "track": "CFEQlDUYCSITCMf1loGc2_ACFZMD4AodVHMPR0Csj82Ai87txKoB"
  },
  {
    "video_id": "I6EVqZmBSQw",
    "track": "CE0QlDUYCiITCMf1loGc2_ACFZMD4AodVHMPR0CMkoXMmbXF0CM="
  },
  {
    "video_id": "0d8ZKfdl75k",
    "track": "CEkQlDUYCyITCMf1loGc2_ACFZMD4AodVHMPR0CZ35e7n6XG79EB"
  },
  {
    "video_id": "QfOQNY3V77I",
    "track": "CEUQlDUYDCITCMf1loGc2_ACFZMD4AodVHMPR0Cy39fu2Ibk-UE="
  },
  {
    "video_id": "-Ll83tYJ1Xo",
    "track": "CEEQlDUYDSITCMf1loGc2_ACFZMD4AodVHMPR0D6qqew7Zvf3PgB"
  },
  {
    "video_id": "wjSAzXZjgeM",
    "track": "CD0QlDUYDiITCMf1loGc2_ACFZMD4AodVHMPR0Djg46z15mgmsIB"
  },
  {
    "video_id": "Lh41l0ZIVIg",
    "track": "CDkQlDUYDyITCMf1loGc2_ACFZMD4AodVHMPR0CIqaGy9LKNjy4="
  },
  {
    "video_id": "LHpiC-gXYpY",
    "track": "CDUQlDUYECITCMf1loGc2_ACFZMD4AodVHMPR0CWxd3AvsGYvSw="
  },
  {
    "video_id": "0Xth4hRAldk",
    "track": "CDEQlDUYESITCMf1loGc2_ACFZMD4AodVHMPR0DZq4KiobzYvdEB"
  },
  {
    "video_id": "poTPODFJm3Q",
    "track": "CC0QlDUYEiITCMf1loGc2_ACFZMD4AodVHMPR0D0tqaKg-ezwqYB"
  },
  {
    "video_id": "wmoFAJcCEUU",
    "track": "CCkQlDUYEyITCMf1loGc2_ACFZMD4AodVHMPR0DFooi4iaCBtcIB"
  },
  {
    "video_id": "8q3_v3HOSwI",
    "track": "CCUQlDUYFCITCMf1loGc2_ACFZMD4AodVHMPR0CClrmO9_f_1vIB"
  },
  {
    "video_id": "isMYnF86Mtk",
    "track": "CCEQlDUYFSITCMf1loGc2_ACFZMD4AodVHMPR0DZ5ej5xZPG4YoB"
  },
  {
    "video_id": "QmtCkrKaqvQ",
    "track": "CB0QlDUYFiITCMf1loGc2_ACFZMD4AodVHMPR0D01eqUq9LQtUI="
  },
  {
    "video_id": "hkxRj70VoBM",
    "track": "CBkQlDUYFyITCMf1loGc2_ACFZMD4AodVHMPR0CTwNbo-7GUpoYB"
  },
  {
    "video_id": "0NHqv_ARAEM",
    "track": "CBUQlDUYGCITCMf1loGc2_ACFZMD4AodVHMPR0DDgMSA_9f66NAB"
  },
  {
    "video_id": "kPtuGZhTIuQ",
    "track": "CBEQlDUYGSITCMf1loGc2_ACFZMD4AodVHMPR0DkxczCmcPb_ZAB"
  },
  {
    "video_id": "wIFkrLYrSnw",
    "track": "CA0QlDUYGiITCMf1loGc2_ACFZMD4AodVHMPR0D8lK2xy5XZwMAB"
  },
  {
    "video_id": "2oxZrqXIsJc",
    "track": "CAkQlDUYGyITCMf1loGc2_ACFZMD4AodVHMPR0CX4aKu6rWWxtoB"
  },
  {
    "video_id": "GMEudStxTJA",
    "track": "CAUQlDUYHCITCMf1loGc2_ACFZMD4AodVHMPR0CQmcXb0s7L4Bg="
  },
  {
    "video_id": "yy16S_rEq_4",
    "track": "CAEQlDUYHSITCMf1loGc2_ACFZMD4AodVHMPR0D-15LWv8nelssB"
  },
  {
    "video_id": "wi-6gZJyAe8",
    "track": "CHUQlDUYACITCL60-IGc2_ACFZgH4AodadYOxUDvg8iTmdDul8IB"
  },
  {
    "video_id": "HV6QBlaO8II",
    "track": "CHEQlDUYASITCL60-IGc2_ACFZgH4AodadYOxUCC4bu05YCkrx0="
  },
  {
    "video_id": "-VBe6xpIU0w",
    "track": "CG0QlDUYAiITCL60-IGc2_ACFZgH4AodadYOxUDMpqHSsd2XqPkB"
  },
  {
    "video_id": "IfrR2wRVmuQ",
    "track": "CGkQlDUYAyITCL60-IGc2_ACFZgH4AodadYOxUDktdaisLu0_SE="
  },
  {
    "video_id": "izJWoz-DuAI",
    "track": "CGUQlDUYBCITCL60-IGc2_ACFZgH4AodadYOxUCC8I78s9SVmYsB"
  },
  {
    "video_id": "bYpQFxVpMBM",
    "track": "CGEQlDUYBSITCL60-IGc2_ACFZgH4AodadYOxUCT4KSr8YKUxW0="
  },
  {
    "video_id": "q6JVJtvop9g",
    "track": "CF0QlDUYBiITCL60-IGc2_ACFZgH4AodadYOxUDYz6Lf7aSV0asB"
  },
  {
    "video_id": "gqNYHpUzLw4",
    "track": "CFkQlDUYByITCL60-IGc2_ACFZgH4AodadYOxUCO3syp6YPW0YIB"
  },
  {
    "video_id": "WXbnWAQ_Erg",
    "track": "CFUQlDUYCCITCL60-IGc2_ACFZgH4AodadYOxUC4pfyhgOu5u1k="
  },
  {
    "video_id": "IEWT4hcBMqg",
    "track": "CFEQlDUYCSITCL60-IGc2_ACFZgH4AodadYOxUCo5YS4ofzkoiA="
  },
  {
    "video_id": "FkoCXSaC2_w",
    "track": "CE0QlDUYCiITCL60-IGc2_ACFZgH4AodadYOxUD8t4u00suApRY="
  },
  {
    "video_id": "kExdlzBkERY",
    "track": "CEkQlDUYCyITCL60-IGc2_ACFZgH4AodadYOxUCWopCD87KXppAB"
  },
  {
    "video_id": "m2BYWWMA0U8",
    "track": "CEUQlDUYDCITCL60-IGc2_ACFZgH4AodadYOxUDPooOYlouWsJsB"
  },
  {
    "video_id": "0O-igLflGus",
    "track": "CEEQlDUYDSITCL60-IGc2_ACFZgH4AodadYOxUDrtZS_i9Do99AB"
  },
  {
    "video_id": "QlUULLwTA6A",
    "track": "CD0QlDUYDiITCL60-IGc2_ACFZgH4AodadYOxUCgh8zgy4XFqkI="
  },
  {
    "video_id": "Vi6VPCb88Tk",
    "track": "CDkQlDUYDyITCL60-IGc2_ACFZgH4AodadYOxUC54vO3wqell1Y="
  },
  {
    "video_id": "RgdiU381L2k",
    "track": "CDUQlDUYECITCL60-IGc2_ACFZgH4AodadYOxUDp3tT5t8rYg0Y="
  },
  {
    "video_id": "zUUPMpWLuvY",
    "track": "CDEQlDUYESITCL60-IGc2_ACFZgH4AodadYOxUD29a6sqebDos0B"
  },
  {
    "video_id": "RwFLmMiRWMM",
    "track": "CC0QlDUYEiITCL60-IGc2_ACFZgH4AodadYOxUDDscXEjPPSgEc="
  },
  {
    "video_id": "5k2GQ4uJypg",
    "track": "CCkQlDUYEyITCL60-IGc2_ACFZgH4AodadYOxUCYlafcuMjhpuYB"
  },
  {
    "video_id": "bBGN4esa2zs",
    "track": "CCUQlDUYFCITCL60-IGc2_ACFZgH4AodadYOxUC7tuvYnrzjiGw="
  },
  {
    "video_id": "cRZckR7m82g",
    "track": "CCEQlDUYFSITCL60-IGc2_ACFZgH4AodadYOxUDo5pv3kZKXi3E="
  },
  {
    "video_id": "M6eENvDRNd0",
    "track": "CB0QlDUYFiITCL60-IGc2_ACFZgH4AodadYOxUDd68SG74bh0zM="
  },
  {
    "video_id": "LiJQb70Pl48",
    "track": "CBkQlDUYFyITCL60-IGc2_ACFZgH4AodadYOxUCPr77o-42UkS4="
  },
  {
    "video_id": "IsCSt-bKD8M",
    "track": "CBUQlDUYGCITCL60-IGc2_ACFZgH4AodadYOxUDDn6i2_tak4CI="
  },
  {
    "video_id": "Y6GEDbL7wcc",
    "track": "CBEQlDUYGSITCL60-IGc2_ACFZgH4AodadYOxUDHg--X24Hh0GM="
  },
  {
    "video_id": "PgfvfyEVzKc",
    "track": "CA0QlDUYGiITCL60-IGc2_ACFZgH4AodadYOxUCnmdeI8u_7gz4="
  },
  {
    "video_id": "LEG-JTJ_vwQ",
    "track": "CAkQlDUYGyITCL60-IGc2_ACFZgH4AodadYOxUCE_v6T08TvoCw="
  },
  {
    "video_id": "-U4mkZVcIEI",
    "track": "CAUQlDUYHCITCL60-IGc2_ACFZgH4AodadYOxUDCwPCqmdKJp_kB"
  },
  {
    "video_id": "rQv_mV3D9_0",
    "track": "CAEQlDUYHSITCL60-IGc2_ACFZgH4AodadYOxUD974_ulfP_ha0B"
  },
  {
    "video_id": "5yUwtJma5UM",
    "track": "CHUQlDUYACITCJ684YKc2_ACFZWA3godYh0NQEDDyuvMyZbMkucB"
  },
  {
    "video_id": "hONNP_Cc_MU",
    "track": "CHEQlDUYASITCJ684YKc2_ACFZWA3godYh0NQEDF-fOE_6fT8YQB"
  },
  {
    "video_id": "JWVZikc82oI",
    "track": "CG0QlDUYAiITCJ684YKc2_ACFZWA3godYh0NQECCtfO5pLHWsiU="
  },
  {
    "video_id": "HiWVVM-Mgcs",
    "track": "CGkQlDUYAyITCJ684YKc2_ACFZWA3godYh0NQEDLg7L8zKrlkh4="
  },
  {
    "video_id": "gY_RB6ix6nw",
    "track": "CGUQlDUYBCITCJ684YKc2_ACFZWA3godYh0NQED81MfF-qD0x4EB"
  },
  {
    "video_id": "h1m7oN08Px4",
    "track": "CGEQlDUYBSITCJ684YKc2_ACFZWA3godYh0NQECe_vDpjfTurIcB"
  },
  {
    "video_id": "0P1fm6pDAkc",
    "track": "CF0QlDUYBiITCJ684YKc2_ACFZWA3godYh0NQEDHhIzSuvPX_tAB"
  },
  {
    "video_id": "sxgESTvhhoM",
    "track": "CFkQlDUYByITCJ684YKc2_ACFZWA3godYh0NQECDjYbfk4mBjLMB"
  },
  {
    "video_id": "PrfhdK4t0kc",
    "track": "CFUQlDUYCCITCJ684YKc2_ACFZWA3godYh0NQEDHpLfxyq742z4="
  },
  {
    "video_id": "7ScMIx7RNbg",
    "track": "CFEQlDUYCSITCJ684YKc2_ACFZWA3godYh0NQEC468T2sYTDk-0B"
  },
  {
    "video_id": "tUCQsdWLFWY",
    "track": "CE0QlDUYCiITCJ684YKc2_ACFZWA3godYh0NQEDmqqysnZakoLUB"
  },
  {
    "video_id": "tq6oJ0YFXuc",
    "track": "CEkQlDUYCyITCJ684YKc2_ACFZWA3godYh0NQEDnvZWw9ISq17YB"
  },
  {
    "video_id": "qWXhve6z__E",
    "track": "CEUQlDUYDCITCJ684YKc2_ACFZWA3godYh0NQEDx_8_13rf4sqkB"
  },
  {
    "video_id": "AJbaIdQA3c8",
    "track": "CEEQlDUYDSITCJ684YKc2_ACFZWA3godYh0NQEDPu4OgncS2Sw=="
  },
  {
    "video_id": "5U8D_BUrvyw",
    "track": "CD0QlDUYDiITCJ684YKc2_ACFZWA3godYh0NQECs_q6pwf_Ap-UB"
  },
  {
    "video_id": "DJlyZPFFcJQ",
    "track": "CDkQlDUYDyITCJ684YKc2_ACFZWA3godYh0NQECU4ZWKz8zczAw="
  },
  {
    "video_id": "JCRLZ2eB24M",
    "track": "CDUQlDUYECITCJ684YKc2_ACFZWA3godYh0NQECDt4e89uySkiQ="
  },
  {
    "video_id": "ClYfZXw5dto",
    "track": "CDEQlDUYESITCJ684YKc2_ACFZWA3godYh0NQEDa7eXh1-yHqwo="
  },
  {
    "video_id": "bKCRJIWMKCg",
    "track": "CC0QlDUYEiITCJ684YKc2_ACFZWA3godYh0NQECo0LCsyKSk0Gw="
  },
  {
    "video_id": "81Ak9BGYy6E",
    "track": "CCkQlDUYEyITCJ684YKc2_ACFZWA3godYh0NQEChl-OMwZ6JqPMB"
  },
  {
    "video_id": "oFXg2yLmM1w",
    "track": "CCUQlDUYFCITCJ684YKc2_ACFZWA3godYh0NQEDc5piXspv4qqAB"
  },
  {
    "video_id": "_jIZuXup-B0",
    "track": "CCEQlDUYFSITCJ684YKc2_ACFZWA3godYh0NQECd8Kfdl7eGmf4B"
  },
  {
    "video_id": "hdmx6dW1AAc",
    "track": "CB0QlDUYFiITCJ684YKc2_ACFZWA3godYh0NQECHgNStnb3s7IUB"
  },
  {
    "video_id": "JL1LN53d6IY",
    "track": "CBkQlDUYFyITCJ684YKc2_ACFZWA3godYh0NQECG0ffu-ebS3iQ="
  },
  {
    "video_id": "7seR8yeAjsY",
    "track": "CBUQlDUYGCITCJ684YKc2_ACFZWA3godYh0NQEDGnYK8sr7k4-4B"
  },
  {
    "video_id": "AvbeXMCAz5U",
    "track": "CBEQlDUYGSITCJ684YKc2_ACFZWA3godYh0NQECVn4OEzMu3-wI="
  },
  {
    "video_id": "ocPwhkmhWvE",
    "track": "CA0QlDUYGiITCJ684YKc2_ACFZWA3godYh0NQEDxtYXN5JD84aEB"
  },
  {
    "video_id": "Q3c-gc4NK5o",
    "track": "CAkQlDUYGyITCJ684YKc2_ACFZWA3godYh0NQECa17TwnNDPu0M="
  },
  {
    "video_id": "jcFifLVXcXI",
    "track": "CAUQlDUYHCITCJ684YKc2_ACFZWA3godYh0NQEDy4t2qy8_Y4I0B"
  },
  {
    "video_id": "8vAK5MhNmWU",
    "track": "CAEQlDUYHSITCJ684YKc2_ACFZWA3godYh0NQEDlsrbCzNyC-PIB"
  },
  {
    "video_id": "g3apOlHJPIs",
    "track": "CHUQlDUYACITCPCg_IOc2_ACFQEU4Aod0q4HY0CL-aSOpaequ4MB"
  },
  {
    "video_id": "WOU0eq8ZAgg",
    "track": "CHEQlDUYASITCPCg_IOc2_ACFQEU4Aod0q4HY0CIhOT4qo_N8lg="
  },
  {
    "video_id": "1Sy1qKEgejM",
    "track": "CG0QlDUYAiITCPCg_IOc2_ACFQEU4Aod0q4HY0Cz9IGJirWtltUB"
  },
  {
    "video_id": "j6azovOsZfM",
    "track": "CGkQlDUYAyITCPCg_IOc2_ACFQEU4Aod0q4HY0Dzy7Gdr_Ss048B"
  },
  {
    "video_id": "shoTW_vDdTk",
    "track": "CGUQlDUYBCITCPCg_IOc2_ACFQEU4Aod0q4HY0C56o3ev-uEjbIB"
  },
  {
    "video_id": "DYFIB4w0k2Y",
    "track": "CGEQlDUYBSITCPCg_IOc2_ACFQEU4Aod0q4HY0DmptLh-IDSwA0="
  },
  {
    "video_id": "Y-XFPMSyC1s",
    "track": "CF0QlDUYBiITCPCg_IOc2_ACFQEU4Aod0q4HY0DblsilzKfx8mM="
  },
  {
    "video_id": "Ri_hxnXQQQU",
    "track": "CFkQlDUYByITCPCg_IOc2_ACFQEU4Aod0q4HY0CFgsGu57j4l0Y="
  },
  {
    "video_id": "53FVtRJlmvc",
    "track": "CFUQlDUYCCITCPCg_IOc2_ACFQEU4Aod0q4HY0D3tZaT0bbVuOcB"
  },
  {
    "video_id": "wWTOm-ZFY3w",
    "track": "CFEQlDUYCSITCPCg_IOc2_ACFQEU4Aod0q4HY0D8xpWyvtOzssEB"
  },
  {
    "video_id": "-RwWlT0ggeo",
    "track": "CE0QlDUYCiITCPCg_IOc2_ACFQEU4Aod0q4HY0Dqg4Lp09KFjvkB"
  },
  {
    "video_id": "7ZxlCVTPNng",
    "track": "CEkQlDUYCyITCPCg_IOc2_ACFQEU4Aod0q4HY0D47LymlaGZzu0B"
  },
  {
    "video_id": "ONqETis6nX0",
    "track": "CEUQlDUYDCITCPCg_IOc2_ACFQEU4Aod0q4HY0D9uurZ4omh7Tg="
  },
  {
    "video_id": "73FmVTAPrVg",
    "track": "CEEQlDUYDSITCPCg_IOc2_ACFQEU4Aod0q4HY0DY2r6A08rZuO8B"
  },
  {
    "video_id": "hmOGGCneXsE",
    "track": "CD0QlDUYDiITCPCg_IOc2_ACFQEU4Aod0q4HY0DBvfnOgsPhsYYB"
  },
  {
    "video_id": "vxqLXynKz44",
    "track": "CDkQlDUYDyITCPCg_IOc2_ACFQEU4Aod0q4HY0COn6vO8uuijb8B"
  },
  {
    "video_id": "KHdHnVhBbe8",
    "track": "CDUQlDUYECITCPCg_IOc2_ACFQEU4Aod0q4HY0Dv24XC1fPRuyg="
  },
  {
    "video_id": "KAjXaoPk770",
    "track": "CDEQlDUYESITCPCg_IOc2_ACFQEU4Aod0q4HY0C935OfqO21hCg="
  },
  {
    "video_id": "QimHezGhOHY",
    "track": "CC0QlDUYEiITCPCg_IOc2_ACFQEU4Aod0q4HY0D28ISNs-_hlEI="
  },
  {
    "video_id": "uSd8jNYW3LU",
    "track": "CCkQlDUYEyITCPCg_IOc2_ACFQEU4Aod0q4HY0C1uduwzZHfk7kB"
  },
  {
    "video_id": "GBbQeLL01DY",
    "track": "CCUQlDUYFCITCPCg_IOc2_ACFQEU4Aod0q4HY0C2qNOXi4-0ixg="
  },
  {
    "video_id": "qpQiTMIDPFo",
    "track": "CCEQlDUYFSITCPCg_IOc2_ACFQEU4Aod0q4HY0Da-IyQzMmIyqoB"
  },
  {
    "video_id": "_ELPzo9Pvns",
    "track": "CB0QlDUYFiITCPCg_IOc2_ACFQEU4Aod0q4HY0D7_L766PmzofwB"
  },
  {
    "video_id": "gUDGZeGY3xk",
    "track": "CBkQlDUYFyITCPCg_IOc2_ACFQEU4Aod0q4HY0CZvuOM3syxoIEB"
  },
  {
    "video_id": "rfXROiJUwzE",
    "track": "CBUQlDUYGCITCPCg_IOc2_ACFQEU4Aod0q4HY0CxhtOSoqf0-q0B"
  },
  {
    "video_id": "e0VIESSKkYk",
    "track": "CBEQlDUYGSITCPCg_IOc2_ACFQEU4Aod0q4HY0CJo6qkkoLSons="
  },
  {
    "video_id": "FUdyyh8N4Lg",
    "track": "CA0QlDUYGiITCPCg_IOc2_ACFQEU4Aod0q4HY0C4wbf4odncoxU="
  },
  {
    "video_id": "59Ch5sQXTrA",
    "track": "CAkQlDUYGyITCPCg_IOc2_ACFQEU4Aod0q4HY0Cwnd2g7Lyo6OcB"
  },
  {
    "video_id": "V7WnT_7ESsg",
    "track": "CAUQlDUYHCITCPCg_IOc2_ACFQEU4Aod0q4HY0DIlZH2_-np2lc="
  },
  {
    "video_id": "j1BxtIvnMYY",
    "track": "CAEQlDUYHSITCPCg_IOc2_ACFQEU4Aod0q4HY0CG45zfyLacqI8B"
  },
  {
    "video_id": "sa7LOPLjVDY",
    "track": "CHUQlDUYACITCJO17YSc2_ACFRizewod7BEI7UC2qI2Xj-ey17EB"
  },
  {
    "video_id": "TKVOVTl38-g",
    "track": "CHEQlDUYASITCJO17YSc2_ACFRizewod7BEI7UDo59_L08rT0kw="
  },
  {
    "video_id": "2t3SgFmg4eQ",
    "track": "CG0QlDUYAiITCJO17YSc2_ACFRizewod7BEI7UDkw4PNhdD07toB"
  },
  {
    "video_id": "-vm64mqNJwg",
    "track": "CGkQlDUYAyITCJO17YSc2_ACFRizewod7BEI7UCIzrTUptzu_PoB"
  },
  {
    "video_id": "J8Dfx8LiXus",
    "track": "CGUQlDUYBCITCJO17YSc2_ACFRizewod7BEI7UDrvYmX_Pi34Cc="
  },
  {
    "video_id": "DUG7AO5O9kU",
    "track": "CGEQlDUYBSITCJO17YSc2_ACFRizewod7BEI7UDF7LvyjuDuoA0="
  },
  {
    "video_id": "xMH1UBWMEAE",
    "track": "CF0QlDUYBiITCJO17YSc2_ACFRizewod7BEI7UCBoLCsgar94MQB"
  },
  {
    "video_id": "xRXtzU0WiEk",
    "track": "CFkQlDUYByITCJO17YSc2_ACFRizewod7BEI7UDJkNro1Ln7isUB"
  },
  {
    "video_id": "LvJJU2ECAyg",
    "track": "CFUQlDUYCCITCJO17YSc2_ACFRizewod7BEI7UCohoiItqqS-S4="
  },
  {
    "video_id": "WbK4i5cDz80",
    "track": "CFEQlDUYCSITCJO17YSc2_ACFRizewod7BEI7UDNn4-4uZGu2Vk="
  },
  {
    "video_id": "uH0HKlvNoNE",
    "track": "CE0QlDUYCiITCJO17YSc2_ACFRizewod7BEI7UDRwbbepeXBvrgB"
  },
  {
    "video_id": "GxhXiQwAX5c",
    "track": "CEkQlDUYCyITCJO17YSc2_ACFRizewod7BEI7UCXv4HgkPGVjBs="
  },
  {
    "video_id": "OzxOS8cPf0k",
    "track": "CEUQlDUYDCITCJO17YSc2_ACFRizewod7BEI7UDJ_r24vMmTnjs="
  },
  {
    "video_id": "e7utZRICN6E",
    "track": "CEEQlDUYDSITCJO17YSc2_ACFRizewod7BEI7UCh74iQ0azr3Xs="
  },
  {
    "video_id": "zoX4v26LpqI",
    "track": "CD0QlDUYDiITCJO17YSc2_ACFRizewod7BEI7UCiza709pf-ws4B"
  },
  {
    "video_id": "UK7pEhq0-3U",
    "track": "CDkQlDUYDyITCJO17YSc2_ACFRizewod7BEI7UD19tPVoaK611A="
  },
  {
    "video_id": "QArXpHiA5WU",
    "track": "CDUQlDUYECITCJO17YSc2_ACFRizewod7BEI7UDlyoPEx_S1hUA="
  },
  {
    "video_id": "CIkIWpsnlpw",
    "track": "CDEQlDUYESITCJO17YSc2_ACFRizewod7BEI7UCcrZ7ZqYvCxAg="
  },
  {
    "video_id": "IpISpb3DrO4",
    "track": "CC0QlDUYEiITCJO17YSc2_ACFRizewod7BEI7UDu2Y7u29SEySI="
  },
  {
    "video_id": "XBlDokfje-o",
    "track": "CCkQlDUYEyITCJO17YSc2_ACFRizewod7BEI7UDq942_pPTQjFw="
  },
  {
    "video_id": "A6XKvmXdy0w",
    "track": "CCUQlDUYFCITCJO17YSc2_ACFRizewod7BEI7UDMlveu5tfy0gM="
  },
  {
    "video_id": "xzRFf29N-3M",
    "track": "CCEQlDUYFSITCJO17YSc2_ACFRizewod7BEI7UDz9rf69q-RmscB"
  },
  {
    "video_id": "RVid21HKk5M",
    "track": "CB0QlDUYFiITCJO17YSc2_ACFRizewod7BEI7UCTp6qOtbunrEU="
  },
  {
    "video_id": "FNMNFL9OlOY",
    "track": "CBkQlDUYFyITCJO17YSc2_ACFRizewod7BEI7UDmqbr6y6LD6RQ="
  },
  {
    "video_id": "SV9aOUCYCYg",
    "track": "CBUQlDUYGCITCJO17YSc2_ACFRizewod7BEI7UCIk-CElMfWr0k="
  },
  {
    "video_id": "G4lLehXygzc",
    "track": "CBEQlDUYGSITCJO17YSc2_ACFRizewod7BEI7UC3hsqvoe_SxBs="
  },
  {
    "video_id": "90JKyRjDaxU",
    "track": "CA0QlDUYGiITCJO17YSc2_ACFRizewod7BEI7UCV1o3GkdmSofcB"
  },
  {
    "video_id": "R1W5-6dOgbI",
    "track": "CAkQlDUYGyITCJO17YSc2_ACFRizewod7BEI7UCyg7q6ur_uqkc="
  },
  {
    "video_id": "UgAJ_CeeVj4",
    "track": "CAUQlDUYHCITCJO17YSc2_ACFRizewod7BEI7UC-rPm8wr-CgFI="
  },
  {
    "video_id": "wdxpYwBzBkE",
    "track": "CAEQlDUYHSITCJO17YSc2_ACFRizewod7BEI7UDBjMyDsKya7sEB"
  },
  {
    "video_id": "NWC-dRjLHpc",
    "track": "CHUQlDUYACITCMSirIWc2_ACFQ0Z4AodkoYDZkCXvazG0c6vsDU="
  },
  {
    "video_id": "Ek1r6LNOr48",
    "track": "CHEQlDUYASITCMSirIWc2_ACFQ0Z4AodkoYDZkCP37qai_3aphI="
  },
  {
    "video_id": "B6_BcFt8JCk",
    "track": "CG0QlDUYAiITCMSirIWc2_ACFQ0Z4AodkoYDZkCpyPDbha7w1wc="
  },
  {
    "video_id": "SdqCPPo0GT8",
    "track": "CGkQlDUYAyITCMSirIWc2_ACFQ0Z4AodkoYDZkC_stDRz8eg7Uk="
  },
  {
    "video_id": "O05iLXThJYs",
    "track": "CGUQlDUYBCITCMSirIWc2_ACFQ0Z4AodkoYDZkCLy4Sn18WYpzs="
  },
  {
    "video_id": "aUDCybrAA1g",
    "track": "CGEQlDUYBSITCMSirIWc2_ACFQ0Z4AodkoYDZkDYhoDWm9mwoGk="
  },
  {
    "video_id": "PRCnURqMoQ4",
    "track": "CF0QlDUYBiITCMSirIWc2_ACFQ0Z4AodkoYDZkCOwrLUkeqpiD0="
  },
  {
    "video_id": "P-Ll_gg1mfY",
    "track": "CFkQlDUYByITCMSirIWc2_ACFQ0Z4AodkoYDZkD2s9bB4L-58T8="
  },
  {
    "video_id": "Ag4YepW7xzM",
    "track": "CFUQlDUYCCITCMSirIWc2_ACFQ0Z4AodkoYDZkCzju-tqY-GhwI="
  },
  {
    "video_id": "myra6NZIdvw",
    "track": "CFEQlDUYCSITCMSirIWc2_ACFQ0Z4AodkoYDZkD87aGyjd22lZsB"
  },
  {
    "video_id": "hAnX2kSFT28",
    "track": "CE0QlDUYCiITCMSirIWc2_ACFQ0Z4AodkoYDZkDvnpWkpPv1hIQB"
  },
  {
    "video_id": "D8ngEVZ0DlA",
    "track": "CEkQlDUYCyITCMSirIWc2_ACFQ0Z4AodkoYDZkDQnNCzlYL45A8="
  },
  {
    "video_id": "LXhAwcn51k8",
    "track": "CEUQlDUYDCITCMSirIWc2_ACFQ0Z4AodkoYDZkDPrOfPnJiQvC0="
  },
  {
    "video_id": "THtH0lNCZQY",
    "track": "CEEQlDUYDSITCMSirIWc2_ACFQ0Z4AodkoYDZkCGyomapfrRvUw="
  },
  {
    "video_id": "CF9qYEW1K8I",
    "track": "CD0QlDUYDiITCMSirIWc2_ACFQ0Z4AodkoYDZkDC19SthMzarwg="
  },
  {
    "video_id": "xGkekjjF1TM",
    "track": "CDkQlDUYDyITCMSirIWc2_ACFQ0Z4AodkoYDZkCzqpfGo9LHtMQB"
  },
  {
    "video_id": "-KNRMFZZQDw",
    "track": "CDUQlDUYECITCMSirIWc2_ACFQ0Z4AodkoYDZkC8gOWyhabU0fgB"
  },
  {
    "video_id": "Ve6eDyDqBcM",
    "track": "CDEQlDUYESITCMSirIWc2_ACFQ0Z4AodkoYDZkDDi6iH8sGn91U="
  },
  {
    "video_id": "n-iOeRzt4pk",
    "track": "CC0QlDUYEiITCMSirIWc2_ACFQ0Z4AodkoYDZkCZxbfnkc-j9J8B"
  },
  {
    "video_id": "ubLbTHl3Jq8",
    "track": "CCkQlDUYEyITCMSirIWc2_ACFQ0Z4AodkoYDZkCvzdzLx-m22bkB"
  },
  {
    "video_id": "E1pChImDB2Y",
    "track": "CCUQlDUYFCITCMSirIWc2_ACFQ0Z4AodkoYDZkDmjozMyNCQrRM="
  },
  {
    "video_id": "JfFPBFrPSKs",
    "track": "CCEQlDUYFSITCMSirIWc2_ACFQ0Z4AodkoYDZkCrkb3WxeDT-CU="
  },
  {
    "video_id": "bbTSsO-oMok",
    "track": "CB0QlDUYFiITCMSirIWc2_ACFQ0Z4AodkoYDZkCJ5aD9jta02m0="
  },
  {
    "video_id": "d-8VZByuWeY",
    "track": "CBkQlDUYFyITCMSirIWc2_ACFQ0Z4AodkoYDZkDms7nlwazF93c="
  },
  {
    "video_id": "eWCteEFHc8E",
    "track": "CBUQlDUYGCITCMSirIWc2_ACFQ0Z4AodkoYDZkDB552KhK-rsHk="
  },
  {
    "video_id": "s2NALi3AJ90",
    "track": "CBEQlDUYGSITCMSirIWc2_ACFQ0Z4AodkoYDZkDdz4Du4oXQsbMB"
  },
  {
    "video_id": "IUpYDHGhXkc",
    "track": "CA0QlDUYGiITCMSirIWc2_ACFQ0Z4AodkoYDZkDHvIWNx4GWpSE="
  },
  {
    "video_id": "SziGU7po_8Y",
    "track": "CAkQlDUYGyITCMSirIWc2_ACFQ0Z4AodkoYDZkDG_6PTu8qhnEs="
  },
  {
    "video_id": "x45Bp1SmbiU",
    "track": "CAUQlDUYHCITCMSirIWc2_ACFQ0Z4AodkoYDZkCl3Jml9bSQx8cB"
  },
  {
    "video_id": "dyQ1F31_tBk",
    "track": "CAEQlDUYHSITCMSirIWc2_ACFQ0Z4AodkoYDZkCZ6P7r96KNknc="
  },
  {
    "video_id": "UxExc7wNHOg",
    "track": "CHUQlDUYACITCPaWtYac2_ACFVcn4AodMlMO_0DoubTgu67MiFM="
  },
  {
    "video_id": "zLW_YwjoTgM",
    "track": "CHEQlDUYASITCPaWtYac2_ACFVcn4AodMlMO_0CDnKHHsOzv2swB"
  },
  {
    "video_id": "ZNBKf01LXTU",
    "track": "CG0QlDUYAiITCPaWtYac2_ACFVcn4AodMlMO_0C1uq3q9M-S6GQ="
  },
  {
    "video_id": "Uk2WhcTs7Yc",
    "track": "CGkQlDUYAyITCPaWtYac2_ACFVcn4AodMlMO_0CH27On3NDlplI="
  },
  {
    "video_id": "y58meM2lSVo",
    "track": "CGUQlDUYBCITCPaWtYac2_ACFVcn4AodMlMO_0DakpXtjM_Jz8sB"
  },
  {
    "video_id": "35y0ngxFIW8",
    "track": "CGEQlDUYBSITCPaWtYac2_ACFVcn4AodMlMO_0DvwpTi4JOtzt8B"
  },
  {
    "video_id": "_GCNA4-lF1I",
    "track": "CF0QlDUYBiITCPaWtYac2_ACFVcn4AodMlMO_0DSrpT9uKCjsPwB"
  },
  {
    "video_id": "SB9ldNNL2zU",
    "track": "CFkQlDUYByITCPaWtYac2_ACFVcn4AodMlMO_0C1tq-aza7Zj0g="
  },
  {
    "video_id": "bHqaDt0lVOs",
    "track": "CFUQlDUYCCITCPaWtYac2_ACFVcn4AodMlMO_0DrqZXp7cGmvWw="
  },
  {
    "video_id": "VMyZlfaPpQs",
    "track": "CFEQlDUYCSITCPaWtYac2_ACFVcn4AodMlMO_0CLyr6037Km5lQ="
  },
  {
    "video_id": "EzF4iR40uEg",
    "track": "CE0QlDUYCiITCPaWtYac2_ACFVcn4AodMlMO_0DI8NLxkZHemBM="
  },
  {
    "video_id": "o7yZWFzQZcU",
    "track": "CEkQlDUYCyITCPaWtYac2_ACFVcn4AodMlMO_0DFy8Hmhaum3qMB"
  },
  {
    "video_id": "75CJXFU7LEY",
    "track": "CEUQlDUYDCITCPaWtYac2_ACFVcn4AodMlMO_0DG2OypxauiyO8B"
  },
  {
    "video_id": "hY_odqd-7Po",
    "track": "CEEQlDUYDSITCPaWtYac2_ACFVcn4AodMlMO_0D62fu76o76x4UB"
  },
  {
    "video_id": "a0CzTLqr5cI",
    "track": "CD0QlDUYDiITCPaWtYac2_ACFVcn4AodMlMO_0DCy6_Vy-msoGs="
  },
  {
    "video_id": "FEGIO_NlpVY",
    "track": "CDkQlDUYDyITCPaWtYac2_ACFVcn4AodMlMO_0DWypabv4fioBQ="
  },
  {
    "video_id": "jH7-UvydnL8",
    "track": "CDUQlDUYECITCPaWtYac2_ACFVcn4AodMlMO_0C_ufbkr8q_v4wB"
  },
  {
    "video_id": "UzihxNj7Bi4",
    "track": "CDEQlDUYESITCPaWtYac2_ACFVcn4AodMlMO_0CujOzHzbionFM="
  },
  {
    "video_id": "5HoDWSjX_iQ",
    "track": "CC0QlDUYEiITCPaWtYac2_ACFVcn4AodMlMO_0Ck_N_GkuuAveQB"
  },
  {
    "video_id": "3N0XxMlvyeU",
    "track": "CCkQlDUYEyITCPaWtYac2_ACFVcn4AodMlMO_0Dlk7_LzPjF7twB"
  },
  {
    "video_id": "JXBuvYp5aJM",
    "track": "CCUQlDUYFCITCPaWtYac2_ACFVcn4AodMlMO_0CT0eXT2NebuCU="
  },
  {
    "video_id": "N8SLN17mYms",
    "track": "CCEQlDUYFSITCPaWtYac2_ACFVcn4AodMlMO_0DrxJn39eai4jc="
  },
  {
    "video_id": "3eDiWFs5Rzc",
    "track": "CB0QlDUYFiITCPaWtYac2_ACFVcn4AodMlMO_0C3juXZhcu48N0B"
  },
  {
    "video_id": "kP9D_0ucSPA",
    "track": "CBkQlDUYFyITCPaWtYac2_ACFVcn4AodMlMO_0DwkfHc9P_Q_5AB"
  },
  {
    "video_id": "yYnl2e6iB2A",
    "track": "CBUQlDUYGCITCPaWtYac2_ACFVcn4AodMlMO_0Dgjoj1nrv5xMkB"
  },
  {
    "video_id": "QXz7zpEDWjY",
    "track": "CBEQlDUYGSITCPaWtYac2_ACFVcn4AodMlMO_0C2tI2I6fm-vkE="
  },
  {
    "video_id": "pVf0qJEJxKg",
    "track": "CA0QlDUYGiITCPaWtYac2_ACFVcn4AodMlMO_0CoiaeIiZX9q6UB"
  },
  {
    "video_id": "C_A995wFvxw",
    "track": "CAkQlDUYGyITCPaWtYac2_ACFVcn4AodMlMO_0Cc_pbg-b6P-As="
  },
  {
    "video_id": "WfU0oRozPCE",
    "track": "CAUQlDUYHCITCPaWtYac2_ACFVcn4AodMlMO_0Ch-MzRkZTN-lk="
  },
  {
    "video_id": "QNMsmi2PwNU",
    "track": "CAEQlDUYHSITCPaWtYac2_ACFVcn4AodMlMO_0DVgb_sopPL6UA="
  },
  {
    "video_id": "2mD1LPva4YQ",
    "track": "CHUQlDUYACITCPiOl4ic2_ACFd0C4AodFBkJbECEw-vez6W9sNoB"
  },
  {
    "video_id": "zz5u4uTuum4",
    "track": "CHEQlDUYASITCPiOl4ic2_ACFd0C4AodFBkJbEDu9Lqnrtybn88B"
  },
  {
    "video_id": "jjUFSfiWeVU",
    "track": "CG0QlDUYAiITCPiOl4ic2_ACFd0C4AodFBkJbEDV8tnEn6nBmo4B"
  },
  {
    "video_id": "WHASYE2e5Xo",
    "track": "CGkQlDUYAyITCPiOl4ic2_ACFd0C4AodFBkJbED6yvvshMyEuFg="
  },
  {
    "video_id": "nT84kJUkdYs",
    "track": "CGUQlDUYBCITCPiOl4ic2_ACFd0C4AodFBkJbECL65GpiZLOn50B"
  },
  {
    "video_id": "ugMAPe2pMeI",
    "track": "CGEQlDUYBSITCPiOl4ic2_ACFd0C4AodFBkJbEDi46Tt3ofAgboB"
  },
  {
    "video_id": "m4rfXqfEOnY",
    "track": "CF0QlDUYBiITCPiOl4ic2_ACFd0C4AodFBkJbED29JC-6uu3xZsB"
  },
  {
    "video_id": "_ayltL4-LG4",
    "track": "CFkQlDUYByITCPiOl4ic2_ACFd0C4AodFBkJbEDu2Pjxy7ap1v0B"
  },
  {
    "video_id": "Yswa_v672bw",
    "track": "CFUQlDUYCCITCPiOl4ic2_ACFd0C4AodFBkJbEC8s-_179-G5mI="
  },
  {
    "video_id": "4CzmLbD-KOY",
    "track": "CFEQlDUYCSITCPiOl4ic2_ACFd0C4AodFBkJbEDm0fiH28W5luAB"
  },
  {
    "video_id": "IQ5zD7Upxyo",
    "track": "CE0QlDUYCiITCPiOl4ic2_ACFd0C4AodFBkJbECqjqep--GchyE="
  },
  {
    "video_id": "DLthjPLDBKw",
    "track": "CEkQlDUYCyITCPiOl4ic2_ACFd0C4AodFBkJbECsiYyWz7HY3Qw="
  },
  {
    "video_id": "_SbUlUS00mE",
    "track": "CEUQlDUYDCITCPiOl4ic2_ACFd0C4AodFBkJbEDhpNOl1JK1k_0B"
  },
  {
    "video_id": "kcKr-Kx0ZkQ",
    "track": "CEEQlDUYDSITCPiOl4ic2_ACFd0C4AodFBkJbEDEzNHjiv-q4ZEB"
  },
  {
    "video_id": "iRcR1s7RzgA",
    "track": "CD0QlDUYDiITCPiOl4ic2_ACFd0C4AodFBkJbECAnMf27LrEi4kB"
  },
  {
    "video_id": "z1YaCnjETZY",
    "track": "CDkQlDUYDyITCPiOl4ic2_ACFd0C4AodFBkJbECWm5HGp8GGq88B"
  },
  {
    "video_id": "1KHjLetMWkc",
    "track": "CDUQlDUYECITCPiOl4ic2_ACFd0C4AodFBkJbEDHtLHa3uX40NQB"
  },
  {
    "video_id": "b8pjs8GEAFc",
    "track": "CDEQlDUYESITCPiOl4ic2_ACFd0C4AodFBkJbEDXgJCMvPaY5W8="
  },
  {
    "video_id": "zBppdi4h46U",
    "track": "CC0QlDUYEiITCPiOl4ic2_ACFd0C4AodFBkJbEClx4fx4q6ajcwB"
  },
  {
    "video_id": "Ie6GOeYoEVo",
    "track": "CCkQlDUYEyITCPiOl4ic2_ACFd0C4AodFBkJbEDaoqCxnseh9yE="
  },
  {
    "video_id": "mprkUrHCrx4",
    "track": "CCUQlDUYFCITCPiOl4ic2_ACFd0C4AodFBkJbECe3oqOq4q5zZoB"
  },
  {
    "video_id": "Whyt2KMhLlI",
    "track": "CCEQlDUYFSITCPiOl4ic2_ACFd0C4AodFBkJbEDS3ISZirurjlo="
  },
  {
    "video_id": "CQbE4tXZSkw",
    "track": "CB0QlDUYFiITCPiOl4ic2_ACFd0C4AodFBkJbEDMlOWurZyxgwk="
  },
  {
    "video_id": "oUdc633xiDw",
    "track": "CBkQlDUYFyITCPiOl4ic2_ACFd0C4AodFBkJbEC8kMbvt53Xo6EB"
  },
  {
    "video_id": "okaMRtJALtQ",
    "track": "CBUQlDUYGCITCPiOl4ic2_ACFd0C4AodFBkJbEDU3YCS7Yijo6IB"
  },
  {
    "video_id": "syF9W_FZ93M",
    "track": "CBEQlDUYGSITCPiOl4ic2_ACFd0C4AodFBkJbEDz7ueKv6vfkLMB"
  },
  {
    "video_id": "JEYhTGy4078",
    "track": "CA0QlDUYGiITCPiOl4ic2_ACFd0C4AodFBkJbEC_p-PlxqmIoyQ="
  },
  {
    "video_id": "cJbEpv3QZSs",
    "track": "CAkQlDUYGyITCPiOl4ic2_ACFd0C4AodFBkJbECrysHu75Sxy3A="
  },
  {
    "video_id": "xDopBsImnzg",
    "track": "CAUQlDUYHCITCPiOl4ic2_ACFd0C4AodFBkJbEC4vpqR7KCKncQB"
  },
  {
    "video_id": "j5SBHcaexcU",
    "track": "CAEQlDUYHSITCPiOl4ic2_ACFd0C4AodFBkJbEDFi_u03KOgyo8B"
  }
]



const nodes = document.querySelectorAll("ytd-rich-grid-media")
console.log(nodes)
for (const t of nodes) {
  if (t['__data'] !== undefined) {
    console.log('///~~~ ORIGINAL ~~~///')
    console.log(t['__data']['data']['videoId'])
    console.log(t['__data']['data']['trackingParams'])
    const random_idx = Math.floor(Math.random() * videos.length)
    console.log(videos[random_idx])
    t['__data']['data']['videoId'] = videos[random_idx]['video_id']
    t['__data']['data']['trackingParams'] = videos[random_idx]['track']
    console.log('///~~~ FAKE ~~~///')
    console.log(t['__data']['data']['videoId'])
    console.log(t['__data']['data']['trackingParams'])
  }
}
`


document.getElementById("submit").addEventListener("click", () => {
  const code = document.querySelector('.editable').innerText
  console.log(code)
  chrome.devtools.inspectedWindow.eval(code)
    .then(handleResult);
});




// function send_message(_id, _data) {
//   const ID = 'lkccpljndkjcmbkbikhkfionihkllpmb'
//   chrome.runtime.sendMessage(ID, { id: _id, data: _data }, response => {
//     console.log(response.res);
//   })
// }

// send_message(456, { gatto: 'cat' })

/**
When the user clicks the 'message' button,
send a message to the background script.
*/
// const scriptToAttach = "document.body.innerHTML = 'Hi from the devtools';";
// document.getElementById("button_message").addEventListener("click", () => {
//   chrome.runtime.sendMessage({
//     tabId: chrome.devtools.inspectedWindow.tabId,
//     script: scriptToAttach
//   });
// });
