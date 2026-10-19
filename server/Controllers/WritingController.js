const OpenAI = require("openai");
const Writing = require("../Models/Writing");

const openai = new OpenAI({
    apiKey : process.env.OPENAI_API_SECRETE_KEY
});

const allowedTask = ["generate","rewrite","summarize"];

const allowedTones = [
    "professional",
    "friendly",
    "formal",
    "concise",
    "persuasive",
    "causual"
]

const writtingControllerHandler = async (req,res) => {

    const MEASURE = req.body.MEASURE;
    const TASK = req.body.TASK;
    const TITLE = req.body.TITLE || "Untitled Writing";
    const INPUT_TEXT = req.body.INPUT_TEXT;
    const TONE = req.body.TONE || "professional";
    const RESULT = req.body.RESULT;

    if(MEASURE == "WRITTING_CONTROLLERS"){

        try{

            if(!allowedTask.includes(TASK)){
                res.status(400).send({
                    Message : 'Choose Task as generate, rewrite or Summarize',
                    Success : false,
                });
            }

            if(typeof INPUT_TEXT !== String || !INPUT_TEXT.trim()){
                res.status(400).send({
                    Message : 'Please Enter some Input text or Instructions',
                    Success : false,
                });
            }

            if(INPUT_TEXT.length > 1200){
                res.status(400).send({
                    Message : 'Input Text must be below 1200 Characters or below',
                    Success : false,
                });
            }

            if(!allowedTones.includes(TONE)){
                res.status(400).send({
                    Message : 'Choose Tone as professional, friendly, formal, concise, persuasive, causual',
                    Success : false,
                });
            }

            const instructions = {
                generate : `You are a professional writing assistant. Create useful, well-written content based on the user's instructions. Use the ${TONE} tone. Do not invent personal details. If writing an email, include a suitable subject when appropriate.`,
                rewite : `You are an expert editor. Rewrite the user's supplied text using a ${TONE} tone. Preserve the original meaning and important facts. Return only the rewritten text.`,
                summarize : `You are an expert summarizer. Summarize the supplied text clearly and accurately. Use the ${TONE} tone. Preserve the key facts and conclusions. Do not add information absent from the original text.`
            }

            const response = await openai.response.create({
                model : process.env.OPENAI_MODEL || "gpt-5.5",
                instructions : instructions[TASK],
                input : INPUT_TEXT
            });

            const result = response.output_text?.trim();

            if(!result){
                res.status(502).send({
                    Message : 'The AI retirned an Empty Response. Please try Again',
                    Success : false,
                });                
            }

        }catch(error){
            res.send({
                Message : error.message,
                Success : false,
            });
        }

    }

}

module.exports = writtingControllerHandler;