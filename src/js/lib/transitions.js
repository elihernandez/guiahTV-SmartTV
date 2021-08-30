function typeTransition(){
  if(isTizenOS()){
    // return "-webkit-transform";
  }

  return "transform";
}

function fadeInElement(elementId, opFrom, opTo, opS) {
    var element = document.getElementById(elementId);
    transition.begin(element, ["opacity", opFrom, opTo, opS], {
      onBeforeChangeStyle: function(element) {
        element.style.display = "";
        // makeNavigableSections(navigableSections);
      },
      onAfterChangeStyle: function(element) {
      },
      onTransitionEnd: function(element, finished) {
        if (!finished) return;
        makeSectionFocus(focusSection);
      }
    });
}

function fadeInElementDelay(elementId, opFrom, opTo, opS, dS, callback) {
  var element = document.getElementById(elementId);
  transition.begin(element, ["opacity", opFrom, opTo, opS, dS], {
      onBeforeChangeStyle: function(element) {
        element.style.display = "";
      },
      onAfterChangeStyle: function(element){
        makeSectionFocus(focusSection);
      },
      onTransitionEnd: function(element, finished) {
        if (!finished) return;
        return callback();
      }
  });
}
  
function fadeOutElement(elementId, opFrom, opTo, opS) {
  var element = document.getElementById(elementId);
  transition.begin(element, ["opacity", opFrom, opTo, opS], {
      onBeforeChangeStyle: function(element) {
      },
      onAfterChangeStyle: function(element){
      },
      onTransitionEnd: function(element, finished) {
        if (!finished) return;
        element.style.display = "none";
      }
  });
}

function fadeOutElementDelay(elementId, opFrom, opTo, opS, dS) {
  var element = document.getElementById(elementId);
  transition.begin(element, ["opacity", opFrom, opTo, opS, dS], {
      onBeforeChangeStyle: function(element) {
      },
      onAfterChangeStyle: function(element){
      },
      onTransitionEnd: function(element, finished) {
        if (!finished) return;
        makeSectionFocus(focusSection);
        element.style.display = "none";
      }
  });
}

function fadeInTranslateYElement(idElement, opFrom, opTo, opS, trFrom, trTo, trS, elementFocus){
    var element = document.getElementById(idElement);
    transition.begin(element, [
        ["opacity", opFrom, opTo, opS],
        ["transform", "translateY("+trFrom+"px)", "translateY("+trTo+"px)", trS, "ease"]
      ], {
        onBeforeChangeStyle: function(element) {
            element.style.display = "";
            if(!elementFocus){
                makeNavigableSections(navigableSections);
            }
        },
        onAfterChangeStyle: function(element) {
            if(!elementFocus){
                makeSectionFocus(focusSection);
            }else{
                document.getElementById(elementFocus).focus();
            }
        },
        onTransitionEnd: function(element, finished) {
          if (!finished) return;
        }
    });
}

function fadeOutTranslateYElement(idElement, opFrom, opTo, opS, trFrom, trTo, trS, elementFocus){
    var element = document.getElementById(idElement);
    transition.begin(element, [
        ["opacity", opFrom, opTo, opS],
        ["transform", "translateY("+trFrom+"px)", "translateY("+trTo+"px)", trS, "ease"]
      ], {
        onBeforeChangeStyle: function(element) {

        },
        onAfterChangeStyle: function(element) {
            if(elementFocus){
              document.getElementById(elementFocus).focus;
            }
        },
        onTransitionEnd: function(element, finished) {
          if (!finished) return;
          element.style.display = "none";
        }
    });
}

function fadeInTranslateXElement(idElement, opFrom, opTo, opS, trFrom, trTo, trS){
    var element = document.getElementById(idElement);
    transition.begin(element, [
        ["opacity", opFrom, opTo, opS],
        ["transform", "translateX("+trFrom+"px)", "translateX("+trTo+"px)", trS, "ease"]
      ], {
        onBeforeChangeStyle: function(element) {
            element.style.display = "";
            makeNavigableSections(navigableSections);
        },
        onAfterChangeStyle: function(element) {
            makeSectionFocus(focusSection);
        },
        onTransitionEnd: function(element, finished) {
          if (!finished) return;
        }
    });
  
    // element.style.transition  = "opacity "+opS; 
    // element.style.opacity = opTo; 
    // element.style.transform = "translateX("+trFrom+"px)"; 
    // setTimeout(function(){
    //   element.style.transition  = "transform " + trS + " ease"; 
    //   element.style.transform = "translateX("+trTo+"px)"; 
    // }, 10)
}

function fadeOutTranslateXElement(idElement, opFrom, opTo, opS, trFrom, trTo, trS, elementFocus){
    var element = document.getElementById(idElement);
    transition.begin(element, [
        ["opacity", opFrom, opTo, opS],
        ["transform", "translateX("+trFrom+"px)", "translateX("+trTo+"px)", trS, "ease"]
      ], {
        onBeforeChangeStyle: function(element) {

        },
        onAfterChangeStyle: function(element) {
            if(elementFocus){
                document.getElementById(elementFocus).focus();
            }
        },
        onTransitionEnd: function(element, finished) {
          if (!finished) return;
          element.style.display = "none";
        }
    });

    // element.style.transform = "translateX("+trFrom+"px)"; 
    // setTimeout(function(){
    //   element.style.transition  = "transform " + trS + " ease"; 
    //   element.style.transform = "translateX("+trTo+"px)"; 
    //   element.style.transition  = "opacity "+opS; 
    //   element.style.opacity = opTo; 
    // }, 10)
}

function fadeOutElements(idElements, opFrom, opTo, opS){
    idElements.forEach(function(idElement){
        var element = document.getElementById(idElement);
        transition.begin(element, [
            ["opacity", opFrom, opTo, opS]
          ], {
            onBeforeChangeStyle: function(element) {
    
            },
            onAfterChangeStyle: function(element) {
            },
            onTransitionEnd: function(element, finished) {
              if (!finished) return;
              element.style.display = "none";
            }
        });
    })
}

function fadeOutFadeInElements(idElementOut, idElementIn, opFrom, opTo, opS){
  var elementOut = document.getElementById(idElementOut);
  var elementIn = document.getElementById(idElementIn);
  transition.begin(elementOut, [
        ["opacity", opFrom, opTo, opS]
  ], {
    onBeforeChangeStyle: function(elementOut) {
      
    },
    onAfterChangeStyle: function(elementOut) {
      transition.begin(elementIn, ["opacity", opTo, opFrom, opS], {
        onBeforeChangeStyle: function(elementIn) {
          elementIn.style.display = "";
        },
        onAfterChangeStyle: function(elementIn) {
          makeSectionFocus(focusSection);
        },
        onTransitionEnd: function(elementIn, finished) {
          if (!finished) return;
        }
      });
    },
    onTransitionEnd: function(elementOut, finished) {
      if (!finished) return;
      elementOut.style.display = "none";
      
    }
  });
}

function clearView(elementId, clearElement){
  if (elementId && clearElement) {
    document.getElementById(elementId).innerHTML = "";
  }
}

function isVisible(idElement){
  var element = document.getElementById(idElement);
  if(element.style.opacity == 1 || element.style.display == 'block'){
    return true;
  }

  return false;
}

function isHidden(idElement){
  var element = document.getElementById(idElement);
  if(element.style.opacity == 0 || element.style.display == 'none'){
    return true;
  }

  return false;
}