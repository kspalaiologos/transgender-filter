
let imageLoaded = false

// The filter is programmable. Set your own RGB colors here:
const blueFill  = [91, 206, 250]
const pinkFill  = [245, 169, 184]
const whiteFill = [255, 255, 255]

const sBlueFill  = [92, 80, 154]
const sPinkFill  = [193, 103, 136]
const sWhiteFill = [225, 223, 200]

// You can also set the program, which will specify the order of bars on the image.
const program = [
    // Default filter
    [
        blueFill,
        pinkFill,
        whiteFill,
        pinkFill,
        blueFill
    ],
    // Saturated filter
    [
        sBlueFill,
        sPinkFill,
        sWhiteFill,
        sPinkFill,
        sBlueFill
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
