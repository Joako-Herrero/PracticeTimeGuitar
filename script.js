(function() {
    /*************** VARIABLES ***************/
    var button = $('#cn-button'),
      title = $('h1'),
      wrapper = $('#cn-wrapper'),
      overlay = $('#cn-overlay'),
  
      //Scale and keys
      keys = $('#keys'),
      key = $(".key"),
      scale = $('#scale'),
  
      //Major/minor buttons and modes
      majorB = $('#major'),
      minorB = $('#minor'),
      mode = $('#mode'),
      modeMaj = $('#mode .major'),
      modeMin = $('#mode .minor'),
  
      //Is nav open?
      open = false,
      //Currently active mode
      activeMode = 'major',
      activeKey = 'C', // Default set to C
  
      majorScale = {
        'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'E'],
        'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'B'],
        'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#'],
        'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#'],
        'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#'],
        'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#'],
        'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#'],
        'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#'],
        'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Ab'],
        'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'D'],
        'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'G'],
        'Db': ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'C']
      },
      minorScale = {
        'F': ['Fm', 'G', 'Ab', 'Bbm', 'Cm', 'Db', 'Eb'],
        'C': ['Cm', 'D', 'Eb', 'Fm', 'Gm', 'Ab', 'B'],
        'G': ['Gm', 'A', 'Bb', 'Cm', 'Dm', 'Eb', 'F'],
        'D': ['Dm', 'E', 'F', 'Gm', 'Am', 'Bb', 'C'],
        'A': ['Am', 'B', 'C', 'Dm', 'Em', 'F', 'G'],
        'E': ['Em', 'F#', 'G', 'Am', 'Bm', 'C', 'D'],
        'B': ['Bm', 'C#', 'D', 'Em', 'F#m', 'G', 'A'],
        'F#': ['F#m', 'G#', 'A', 'Bm', 'C#m', 'D', 'E'],
        'Bb': ['Bbm', 'C', 'Db', 'Ebm', 'Fm', 'Gb', 'Ab'],
        'Eb': ['Ebm', 'F', 'Gb', 'Abm', 'Bbm', 'Cb', 'Db'],
        'Ab': ['Abm', 'Bb', 'Cb', 'Dbm', 'Ebm', 'Fb', 'Gb'],
        'Db': ['Dbm', 'Eb', 'Fb', 'Gbm', 'Abm', 'Bb', 'C']
      };
      
    /*************** EVENTS ***************/
  
    key.click(function(e) {
      e.preventDefault();
  
      //If it's a flat key, need to append flat symbol for index
      if ($(this).hasClass('flat')) {
        var note = $(this).find('SPAN').html() + 'b';
      }
      //If it's a sharp key, need to append sharp symbol for index
      else if ($(this).hasClass('sharp')) {
        var note = $(this).find('SPAN').html() + '#';
      } else {
        var note = $(this).find('SPAN').html();
      }
  
      //Toggle key active states
      $('.key.active').removeClass('active');
      $(this).addClass('active')
  
      //Set the avtivekey and initiate key funct
      activeKey = note;
      console.log(note);
      setKey(note);
  
    });
  
    button.click(handler);
    wrapper.click(cnhandle);
    majorB.click({
      mode: "major"
    }, changeMode);
    minorB.click({
      mode: "minor"
    }, changeMode);
  
    /*************** FUNCTIONS ***************/
  
    function cnhandle(e) {
      e.preventDefault();
    }
  
    function setKey(note) {
      //Empty out the current scale
      scale.empty();
  
      // If it's the major scale
      if (activeMode === 'major') {
        var notes = majorScale[note];
      } else { //Else it's the minor scale
        var notes = minorScale[note];
      }
  
      //Append the scale notes to the scale
      $.each(notes, function(note, v) {
        var encodedFileName = encodeURIComponent(v);
        scale.append('<img class="note" src="./images/'+ encodedFileName +'.jpg"></img>');
        
      });
    }
  
    function changeMode(e) {
      //Set the active mode to major 
      if (e.data.mode === 'major') {
        activeMode = 'major';
        //Activate button and mode
        majorB.addClass('active');
        modeMaj.addClass('active');
        keys.addClass('major');
  
        if (minorB.hasClass('active')) {
          //Disable active button and mode
          minorB.removeClass('active');
          modeMin.removeClass('active');
          keys.removeClass('minor');
        }
  
      } else { //Set the active mode to minor 
            activeMode = 'minor';
            //Activate button and mode
            minorB.addClass('active');
            modeMin.addClass('active');
            keys.addClass('minor');
  
            if (majorB.hasClass('active')) {
                //Disable active button and mode
                majorB.removeClass('active');
                modeMaj.removeClass('active');
                keys.removeClass('major');
            }
        }
      //Update the key
      setKey(activeKey);
    }
  
    //Toggle the nav open or closed
    function handler(e) {
      if (!open) {
        openNav();
      } else {
        closeNav();
      }
    }
  
    //Open the nav
    function openNav() {
      open = true;
      button.html("-");
      overlay.addClass('on-overlay');
      wrapper.addClass('opened-nav');
      scale.addClass('active');
      mode.addClass('active');
      title.addClass('active');
  
    }
  
    //Close the nav
    function closeNav() {
      open = false;
      button.html("+");
  
      overlay.removeClass('on-overlay');
      wrapper.removeClass('opened-nav');
      mode.removeClass('active');
      title.removeClass('active');
    }
  
    //Initiate key on load
    setKey(activeKey);
})();

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var timer, noteCount, counting, accentPitch = 380, offBeatPitch = 200;
var delta = 0;
var curTime = 0.0;

// Load up dots on pageload
$("document").ready(function() {
$(".ts-top").trigger("change");
$("header").fitText(1, { maxFontSize: "46px" });
});


/*
Scheduling Help by: https://www.html5rocks.com/en/tutorials/audio/scheduling/
*/
function schedule() {
while(curTime < context.currentTime + 0.1) {
  playNote(curTime);
  updateTime();
}
timer = window.setTimeout(schedule, 0.1);
}

function updateTime() {
curTime += 60.0 / parseInt($(".bpm-input").val(), 10);
noteCount++;
}

/* Play note on a delayed interval of t */
function playNote(t) {
    var note = context.createOscillator();

    if(noteCount == parseInt($(".ts-top").val(), 10) )
      noteCount = 0;

    if( $(".counter .dot").eq(noteCount).hasClass("active") )
      note.frequency.value = accentPitch;
    else
      note.frequency.value = offBeatPitch;

    note.connect(context.destination);

    note.start(t);
    note.stop(t + 0.05);

    $(".counter .dot").attr("style", "");

    $(".counter .dot").eq(noteCount).css({
      transform: "translateY(-10px)",
      background: "#F75454"
    });
}

function countDown() {
  var t = $(".timer");

  if( parseInt(t.val(), 10) > 0 && counting === true)
  {
      t.val( parseInt(t.val(), 10) - 1 );
      window.setTimeout(countDown, 1000);
  }
  else
  {
    $(".play-btn").click();
    t.val(60);
  }
}

/* Tap tempo */
$(".tap-btn").click(function() {
  var d = new Date();
  var temp = parseInt(d.getTime(), 10);

  $(".bpm-input").val( Math.ceil(60000 / (temp - delta)) );
  delta = temp;
});

/* Add or subtract bpm */
$(".bpm-minus, .bpm-plus").click(function() {
if($(this).hasClass("bpm-minus"))
  $(".bpm-input").val(parseInt($(".bpm-input").val(), 10) - 1 );
else
  $(".bpm-input").val(parseInt($(".bpm-input").val(), 10) + 1 );
});

/* Change pitches for tones in options */
$(".beat-range, .accent-range").change(function() {
  if($(this).hasClass("beat-range"))
    offBeatPitch = $(this).val();
  else
     accentPitch = $(this).val();
});

/* Activate dots for accents */
$(document).on("click", ".counter .dot", function() {
  $(this).toggleClass("active");
});

$(".options-btn").click(function() {
$(".options").toggleClass("options-active");
});

/* Add dots when time signature is changed */
$(".ts-top, .ts-bottom").on("change", function() {
  var _counter = $(".counter");
  _counter.html("");

  for(var i = 0; i < parseInt($(".ts-top").val(), 10); i++)
  {
    var temp = document.createElement("div");
    temp.className = "dot";

    if(i === 0)
      temp.className += " active";

    _counter.append( temp );
  }
});


/* Play and stop button */
$(".play-btn").click(function() {
if($(this).data("what") === "pause")
{
  // ====== Pause ====== //
  counting = false;
  window.clearInterval(timer);
  $(".counter .dot").attr("style", "");
  $(this).data("what", "play").attr("style","").text("Play");
}
else {
  // ====== Play ====== //
  
if( $("#timer-check").is(":checked") )
 {
   counting = true;
   countDown();
 }
  
  curTime = context.currentTime;
  noteCount = parseInt($(".ts-top").val(), 10);
  schedule();

  $(this).data("what", "pause").css({
    background: "#F75454",
    color: "#FFF"
  }).text("Stop");
}
});