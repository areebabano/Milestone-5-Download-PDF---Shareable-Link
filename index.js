function generateResume() {
    // Get form values
    var name = document.getElementById('fullName').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var location = document.getElementById('location').value;
    var portfolio = document.getElementById('portfolio').value;
    var linkedin = document.getElementById('linkedin').value;
    var github = document.getElementById('github').value;
    var summary = document.getElementById('summary').value;
    var jobTitle = document.getElementById('jobTitle1').value;
    var company = document.getElementById('company1').value;
    var dates = document.getElementById('dates1').value;
    var responsibilities = document.getElementById('responsibilities1').value;
    var degree = document.getElementById('degree').value;
    var school = document.getElementById('school').value;
    var gradYear = document.getElementById('gradYear').value;
    var eduDescription = document.getElementById('eduDescription').value;
    var skills = document.getElementById('skills').value;
    // Set values in resume template
    document.getElementById('resumeName').innerText = name;
    document.getElementById('resumeEmail').innerHTML = "<i class=\"fas fa-envelope\"></i> <b>Email:</b> ".concat(email);
    document.getElementById('resumeContact').innerHTML = "<i class=\"fas fa-phone\"></i> <b>Phone:</b> ".concat(phone);
    document.getElementById('resumeLocation').innerHTML = "<i class=\"fas fa-map-marker-alt\"></i> <b>Location:</b> ".concat(location);
    // Set LinkedIn link with "LinkedIn" text
    var portfolioElement = document.getElementById('resumePortfolio');
    portfolioElement.innerHTML = "<i class=\"fas fa-link\"></i> Portfolio";
    portfolioElement.href = portfolio;
    portfolioElement.target = "_blank"; // Opens in a new tab
    // Set LinkedIn link with "LinkedIn" text
    var linkedinElement = document.getElementById('resumeLinkedIn');
    linkedinElement.innerHTML = "<i class=\"fab fa-linkedin\"></i> LinkedIn";
    linkedinElement.href = linkedin;
    linkedinElement.target = "_blank"; // Opens in a new tab
    // Set LinkedIn link with "LinkedIn" text
    var githubElement = document.getElementById('resumeGithub');
    githubElement.innerHTML = "<i class=\"fab fa-github\"></i> GitHub";
    githubElement.href = github;
    githubElement.target = "_blank"; // Opens in a new tab
    document.getElementById('resumeSummary').innerText = summary;
    // Work experience section with icons
    var experienceHTML = "\n        <div class=\"experience-item\">\n            <div class=\"job-title\"><i class=\"fas fa-briefcase\"></i> ".concat(jobTitle, "</div>\n            <div class=\"company\"><i class=\"fas fa-building\"></i> ").concat(company, "</div>\n            <div class=\"date\"><i class=\"fas fa-calendar-alt\"></i> ").concat(dates, "</div>\n            <div class=\"description\">").concat(responsibilities, "</div>\n        </div>");
    document.getElementById('resumeExperience').innerHTML = experienceHTML;
    // Education section with icons
    var educationHTML = "\n        <div class=\"education-item\">\n            <div class=\"degree\"><i class=\"fas fa-graduation-cap\"></i> ".concat(degree, "</div>\n            <div class=\"school\"><i class=\"fas fa-school\"></i> ").concat(school, "</div>\n            <div class=\"date\"><i class=\"fas fa-calendar-alt\"></i> ").concat(gradYear, "</div>\n            <div class=\"description\">").concat(eduDescription, "</div>\n        </div>");
    document.getElementById('resumeEducation').innerHTML = educationHTML;
    // Skills section
    var skillItems = skills.split(',').map(function (skill) { return "<div class=\"skill\"><i class=\"fas fa-check-circle\"></i> ".concat(skill.trim(), "</div>"); }).join('');
    document.getElementById('resumeSkills').innerHTML = skillItems;
    // Show the resume template
    document.getElementById('resumeTemplate').style.display = 'block';
}
// Function to load profile picture
function loadPhotos(event) {
    var fileInput = event.target;
    var reader = new FileReader();
    reader.onload = function () {
        var resumePhoto = document.getElementById('resumePhoto');
        resumePhoto.src = reader.result;
        resumePhoto.style.display = 'block'; // Ensure photo is displayed
    };
    if (fileInput.files && fileInput.files[0]) {
        reader.readAsDataURL(fileInput.files[0]);
    }
}
// / Make sections editable
var makeSectionsEditable = function (element) {
    element.contentEditable = "true";
    element.addEventListener('blur', function () {
        // Optionally add logic here to handle saving changes if needed
    });
};
// Add Editable Functionality
var FullName = document.getElementById('resumeName');
var Email = document.getElementById('resumeEmail');
var Contact = document.getElementById('resumeContact');
var Locations = document.getElementById('resumeLocation');
var Experience = document.getElementById('resumeExperience');
var Summary = document.getElementById('resumeSummary');
var Education = document.getElementById('resumeEducation');
var Skills = document.getElementById('resumeSkills');
if (FullName)
    makeSectionsEditable(FullName);
if (Email)
    makeSectionsEditable(Email);
if (Contact)
    makeSectionsEditable(Contact);
if (Locations)
    makeSectionsEditable(Locations);
if (Experience)
    makeSectionsEditable(Experience);
if (Summary)
    makeSectionsEditable(Summary);
if (Education)
    makeSectionsEditable(Education);
if (Skills)
    makeSectionsEditable(Skills);
var downloadResume = function () {
    // Hide the download and share buttons temporarily for PDF
    var actionButtons = document.querySelector('.action-buttons');
    if (actionButtons) {
        actionButtons.style.display = 'none';
    }
    var element = document.getElementById('resumeTemplate');
    var nameElement = document.getElementById('fullName');
    var name = (nameElement === null || nameElement === void 0 ? void 0 : nameElement.value) || 'resume';
    var fileName = "".concat(name.replace(/\s+/g, '_'), "_resume.pdf");
    var opt = {
        margin: 1,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // Generate PDF
    if (element) {
        html2pdf().set(opt).from(element).save().then(function () {
            // Show the buttons again after PDF is generated
            if (actionButtons) {
                actionButtons.style.display = 'flex';
            }
        });
    }
};
var generateShareableLink = function () {
    var nameElement = document.getElementById('fullName');
    var name = (nameElement === null || nameElement === void 0 ? void 0 : nameElement.value) || '';
    var timestamp = Date.now();
    var uniqueId = "".concat(name.toLowerCase().replace(/\s+/g, '-'), "-").concat(timestamp);
    // Save resume data to localStorage
    var resumeTemplate = document.getElementById('resumeTemplate');
    if (resumeTemplate) {
        var clonedTemplate = resumeTemplate.cloneNode(true);
        localStorage.setItem("resume_".concat(uniqueId), clonedTemplate.outerHTML);
    }
    // Create shareable link
    var shareableURL = "".concat(window.location.origin, "/view.html?id=").concat(uniqueId);
    // Show the shareable link
    var linkContainer = document.createElement('div');
    linkContainer.className = 'share-link-container';
    linkContainer.innerHTML = "\n        <div class=\"share-link-box\">\n            <p>\u2728 Your resume link is ready:</p>\n            <div class=\"link-input-group\">\n                <input type=\"text\" value=\"".concat(shareableURL, "\" readonly class=\"share-link-input\">\n                <button onclick=\"copyToClipboard('").concat(shareableURL, "')\" class=\"copy-btn\">\n                    <i class=\"fas fa-copy\"></i> Copy\n                </button>\n            </div>\n            <p class=\"share-note\">\u26A1 This link will work until you clear your browser data</p>\n            <button onclick=\"closeShareDialog(this.parentElement)\" class=\"close-btn\">\n                <i class=\"fas fa-times\"></i>\n            </button>\n        </div>\n    ");
    document.body.appendChild(linkContainer);
};
var copyToClipboard = function (text) {
    navigator.clipboard.writeText(text).then(function () {
        var copyBtn = document.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
            setTimeout(function () {
                copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
            }, 2000);
        }
    });
};
var closeShareDialog = function (element) {
    var _a;
    (_a = element === null || element === void 0 ? void 0 : element.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
};
var addActionButtons = function () {
    var buttonContainer = document.createElement('div');
    buttonContainer.className = 'action-buttons';
    buttonContainer.innerHTML = "\n        <button onclick=\"downloadResume()\" class=\"action-btn download-btn\">\n            <i class=\"fas fa-file-pdf\"></i>Download PDF\n        </button>\n        <button onclick=\"generateShareableLink()\" class=\"action-btn share-btn\">\n            <i class=\"fas fa-share-alt\"></i>Share Resume\n        </button>\n    ";
    var resumeElement = document.querySelector('.resume');
    resumeElement === null || resumeElement === void 0 ? void 0 : resumeElement.appendChild(buttonContainer);
};
// Add type for window load event
window.onload = function () {
    addActionButtons();
};
