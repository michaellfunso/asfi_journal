
const quill = new Quill('#quilleditor', {
  modules: {
    toolbar: [
      ['bold', 'italic'],
      ['link', 'blockquote', 'code-block', 'image'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ 'header': [1, 2, false] }],
      [{ 'color': [] }],                             // add color picker 
      ['clean']
    ],
  },
  theme: 'snow',
});

document.addEventListener('DOMContentLoaded', function() {
  var wordCountElement = document.getElementById('word-count');
  var limitExceed = document.getElementById('limit-exceed');

  // Function to update word count and enforce limit
  function updateWordCount() {
    var text = quill.root.innerHTML.trim(); // Get HTML content from Quill editor and trim whitespace
     // Split text into words
    var words = text.split(/\s+/); // Replace HTML tags with spaces and split text into words

    // Calculate word count
    var wordCount = words.length;

    // Update word count display
    wordCountElement.textContent = 'Word Count: ' + wordCount + ' words';


    // Check if exceeded maximum limit (300 words or 3000 characters)
    if (wordCount > 300 || text.length > 3000) {
      wordCountElement.style.display = "none";
      // Update word count display with truncated count
      limitExceed.innerHTML = `<p>Word Limit Exceeded. Abstract has been trimmed to expected limit, please recheck and adjust accordingly. Maximum of 300 Words!</p>`;
      // Calculate truncated text within limits
      var truncatedText = text.substring(0, 3000);
      var lastSpaceIndex = truncatedText.lastIndexOf(' ');
      truncatedText = truncatedText.substring(0, lastSpaceIndex); // Trim to last complete word

      // Update Quill editor content to truncated text
      quill.root.innerHTML = truncatedText;

      
    } else if (wordCount <= 300 || text.length <= 3000) {
      wordCountElement.style.display = "block";
      wordCountElement.textContent = 'Word Count: ' + wordCount + ' words';
    }
  }

  // Event listener for text change in Quill editor
  quill.on('text-change', function(delta, oldDelta, source) {
    if (source === 'user') { // Check if change is from user input
      updateWordCount();
    }
  });

  // Initial update of word count
  updateWordCount();
});

export {
  quill
}
//   form.addEventListener('formdata', (event) => {
//     // Append Quill content before submitting
//     event.formData.append('article_content', JSON.stringify(quill.getContents().ops));
//     console.log(event.formData)
//   });


