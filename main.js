
let imageLoaded = false

// The filter is programmable. Set your own RGB colors here:
const blueFill  = [91, 206, 250]
const pinkFill  = [245, 169, 184]
const whiteFill = [255, 255, 255]

const sBlueFill  = [92, 80, 154]
const sPinkFill  = [193, 103, 136]
const sWhiteFill = [225, 223, 200]

const yellowFill = [243, 197, 69]
const violetFill = [153, 103, 203]
const blackFill	 = [0, 0, 0]

const sYellowFill = [255, 244, 48]
const sVioletFill = [156, 89, 209]
const sBlackFill  = [30, 30, 25]

const darkPinkFill = [218, 0, 181]
const lavenderFill = [108, 80, 151]
const darkBlueFill = [0, 68, 169]

const sDarkPinkFill = [217, 0, 111]
const sLavenderFill = [115, 79, 150]
const sDarkBlueFill = [0, 56, 168]

const mintFill  = [17, 205, 80]
const azureFill = [35, 178, 239]

const sMintFill  = [1, 214, 106]
const sAzureFill = [21, 148, 246]

// You can also set the program, which will specify the order of bars on the image.
const program = [
	// Transgender filter
	[
		blueFill,
		pinkFill,
		whiteFill,
		pinkFill,
		blueFill
	],
	// Transgender saturated filter
	[
		sBlueFill,
		sPinkFill,
		sWhiteFill,
		sPinkFill,
		sBlueFill
	],
	// Nonbinary filter
	[
		yellowFill,
		violetFill,
		whiteFill,
		blackFill
	],
	// Nonbinary saturated filter
	[
		sYellowFill,
		sVioletFill,
		sWhiteFill,
		sBlackFill
	],
	// Bisexual filter
	[
		darkPinkFill,
		darkPinkFill,
		lavenderFill,
		darkBlueFill,
		darkBlueFill
	],
	// Bisexual saturated filter
	[
		sDarkPinkFill,
		sDarkPinkFill,
		sLavenderFill,
		sDarkBlueFill,
		sDarkBlueFill
	],
	// Polysexual filter
	[
		darkPinkFill,
		mintFill,
		azureFill
	],
	// Polysexual saturated filter
	[
		sDarkPinkFill,
		sMintFill,
		sAzureFill
	]
]

const status = document.getElementById('status')

const previewComponent = document.createElement('img')

const updatePreview = (opacity) => {
    const photo = image.files[0]
    const ctx = canvas.getContext('2d')
    const reader = new FileReader()
    const idx = styles.selectedIndex
    
    if(photo === undefined) {
        status.innerText = 'select an image'
        imageLoaded = false
        return
    }
    
    if(!photo.type.startsWith('image/')) {
        status.innerText = 'error: not an image file'
        imageLoaded = false
        return
    }
    
    reader.onload = (e) => {
        previewComponent.src = e.target.result
        
        canvas.width = previewComponent.naturalWidth
        canvas.height = previewComponent.naturalHeight
        
        ctx.drawImage(previewComponent, 0, 0)
        
        imageLoaded = true
        
        const barWidth = canvas.width
        const barHeight = canvas.height / program[idx].length
        
        ctx.lineWidth = 0
        
        for(let i = 0; i < program[idx].length; i++) {
            ctx.fillStyle = 'rgba(' + program[idx][i].join(',') + ', ' + (opacity / 100) + ')'
            ctx.beginPath()
            ctx.fillRect(0, i * barHeight, barWidth, barHeight)
            ctx.stroke()
        }
        
        status.innerText = 'done'
    }
    
    reader.readAsDataURL(photo)
};

const morphState = () => {
    opacitystatus.innerText = opacity.value
    updatePreview(opacity.value)
}

// Probs need only one image.on* event, but without both the preview seems
// sloppy. I could also put it on setInterval for extra reliability (browsers suk)
// but this would totally kill the performance.
opacity.onchange     = morphState
image.oninput        = morphState
image.onchange       = morphState
document.body.onload = morphState

dl.onclick = () => {
    if(imageLoaded)
        dl.href = canvas.toDataURL('image/png')
    else
        status.innerText = 'please select an image file'
}
