// QUESTIONS 

const Questions =[
    {
        id: 0,
        q: "",
        a: [{text: ""},
            {text: ""},
            {text: ""},
            {text: ""},
        ]
    },
    
    {
        id: 1,
        q: "",
        a: [{text: ""},
            {text: ""},
            {text: ""},
            {text: ""},
        ]
    },
    
    {
        id: 2,
        q: "",
        a: [{text: ""},
            {text: ""},
            {text: ""},
            {text: ""},
        ]
    },
    
    {
        id: 3,
        q: "",
        a: [{text: ""},
            {text: ""},
            {text: ""},
            {text: ""},
        ]
    },
    
    {
        id: 4,
        q: "",
        a: [{text: ""},
            {text: ""},
            {text: ""},
            {text: ""},
        ]
    },
    
    {
        id: 5,
        q: "",
        a: [{text: ""},
            {text: ""},
            {text: ""},
            {text: ""},
        ]
    },
    ]
    
    // START QUIZ
    var start = true;
    
    // QUIZ JS
    
    function iterate(id) {
    
        // RESULT DISPLAY
        var result = document.getElementsByClassName("result");
        result[0].innerText = "";
    
        // QUESTION DISPLAY
        const question = document.getElementById("question");
    
        // QUESTION TEXT
        question.innerText = Questions[id].q;
    
        // ANSWERS
        const op1 = document.getElementById('op1');
        const op2 = document.getElementById('op2');
        const op3 = document.getElementById('op3');
        const op4 = document.getElementById('op4');
    
        // ANSWERS TEXT
    
        //TRUE/FALSE VALUE
        op1.value = Questions[id].a[0].isCorrect;
        op2.value = Questions[id].a[1].isCorrect;
        op3.value = Questions[id].a[2].isCorrect;
        op4.value = Questions[id].a[3].isCorrect;
      
        var selected = "";
    
        //HIGHLIGHT SELECTION
        op1.addEventListener("click", () => {
            op1.style.backgroundColor = "lightgoldenrodyellow";
            op2.style.backgroundColor = "lightskyblue";
            op3.style.backgroundColor = "lightskyblue";
            op4.style.backgroundColor = "lightskyblue";
            selected = op1.value;
    
            elements.forEach(dataset => {
                dataset.element.style.backgroundColor = dataset.color
              })
            })
    }
    