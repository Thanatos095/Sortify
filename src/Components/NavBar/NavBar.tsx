import React from 'react'
import Select, { SelectChangeEvent } from '@mui/material/Select';
import VisualArray from '../VisualArray/VisualArray';
import { getUniformRange, getNormalRange } from '../../Utility/Random/Random';
import {
    AppBar,
    Box,
    Toolbar,
    Typography,
    Button,
    MenuItem,
    FormControl,
    Slider,
    Popper,
    Fade,
    Paper,
    TextField,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel,
    Dialog,
    DialogTitle
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DataObjectIcon from '@mui/icons-material/DataObject';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { random } from 'animejs';
interface NavBar_props {
    sortMappings: { [index: string]: (v: VisualArray) => Generator<void> },
    setSort: (sorter: (v: VisualArray) => Generator<void>) => void
    setFPS: (value: number) => void
    play: () => void,
    pause: () => void,
    setData: (data: Array<number>) => void,
    getStatistics : () => any
    onDone : (fun : Function) => void
}


export default function NavBar(props: NavBar_props) {
    const [sort, setsort] = React.useState('Bubble Sort');
    const [playing, setplaying] = React.useState(false);
    const [fps, setfps] = React.useState(60);
    const [open, setopen] = React.useState(false);
    const [openDialog, setopenDialog] = React.useState(false);
    const [popperAnchor, setpopperAnchor] = React.useState<HTMLElement>();
    const [formInput, setformInput] = React.useState({
        array : "",
        length : "",
        min : "",
        max : ""
    });
    const [radioInput, setradioInput] = React.useState("uniform");
    const file = React.useRef<HTMLInputElement>(null);
    const handleFile = () => {    
        file.current!.files![0].arrayBuffer()
            .then((buffer) =>
            {
                const list = new TextDecoder('utf-8').decode(buffer).split(',').map(Number);
                if(!list.some(item => isNaN(item)))
                {
                    props.setData(list);
                }
                else{
                    alert("Invalid input!");
                }
            }); 
    }
    const handleArray = () => {
        const list = formInput.array.split(',').map(Number);
        if(!list.some(item => isNaN(item)))
        {

            props.setData(list);
        }
        else{
            alert("Invalid input!");
        }
    }
    const handleRandom = () => {
        if(formInput.length === "" || formInput.min === "" || formInput.max ==  ""){
            alert('Empty Input');
            return;
        }

        const length = Number(formInput.length);
        const min = Number(formInput.min);
        const max = Number(formInput.max);
        if(isNaN(length) || isNaN(min) || isNaN(max)){
            alert('Invalid Input');
            return;
        }
        if(radioInput === 'normal'){
            props.setData(getNormalRange(min, max, length));
        }
        else{
            props.setData(getUniformRange(min, max, length));
        }
    }
    const handleTextInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        setformInput({...formInput, [event.target.name] : event.target.value})
    }
    const handleRadioInput = (event : React.ChangeEvent<HTMLInputElement>) => {
        setradioInput((event.target as HTMLInputElement).value);
    }
    const handleSelect = (event: SelectChangeEvent) => {
        setsort(event.target.value as string);
        props.setSort(props.sortMappings[event.target.value]);
    };

    const handlePlaying = () => {
        if (playing) props.pause();
        else props.play();
        setplaying(!playing);
    }

    const handleSlider = (event: Event, newValue: number | number[]) => {
        setfps(newValue as number);
        props.setFPS(newValue as number);
    };

    const handlePopperOpen = (event: React.MouseEvent<HTMLElement>) => {
        setpopperAnchor(event.currentTarget);
        setopen(!open);
    };
    React.useEffect(() => {
        props.onDone(() => {
            setplaying(false);
            setopenDialog(true);
        });
    }, []);
    const btn = {
        sx: {
            color: 'white',
            backgroundColor: 'primary.light'
        }
    }
    const getStatisticsDialogBox = () => 
        <Dialog open = {openDialog} onClose={() => setopenDialog(false)}>
            <DialogTitle textAlign='center'>Details</DialogTitle>
            <Box paddingX={4} paddingBottom={3}>
                <Box marginY={1}>
                    <Typography variant="body1" color="initial" display='inline'>Sorting algorithm : </Typography>
                    <Typography variant="body2" color="initial" display='inline'>{sort}</Typography>
                </Box>
                <Box marginY={1}>
                    <Typography variant="body1" color="initial" display='inline'>Number of accesses : </Typography>
                    <Typography variant="body2" color="initial" display='inline'>{props.getStatistics().numAccesses}</Typography>
                </Box>
                <Box marginY={1}>
                    <Typography variant="body1" color="initial" display='inline'>Number of swaps : </Typography>
                    <Typography variant="body2" color="initial" display='inline'>{props.getStatistics().numSwaps}</Typography>
                </Box>
                <Box marginY={1}>
                    <Typography variant="body1" color="initial" display='inline'>Number of comparisons : </Typography>
                    <Typography variant="body2" color="initial" display='inline'>{props.getStatistics().numComparisons}</Typography>
                </Box>
                <Box marginY={1}>
                    <Typography variant="body1" color="initial" display='inline'>Time taken : </Typography>
                    <Typography variant="body2" color="initial" display='inline'>{Math.round(props.getStatistics().timeTaken) + "ms"}</Typography>
                </Box>
            </Box>
        </Dialog>     

    return (
        <Box sx={{ flexGrow: 1 }}>
            {props.getStatistics() && getStatisticsDialogBox()}
            <AppBar color='primary' position="static">
                <Toolbar>
                    <Box flexGrow={1} display='flex' flexDirection='row' alignItems='center' >
                        <Typography variant="h6" component="div">
                            Sortify
                        </Typography>
                        <Box minWidth={120} mx={3} >
                            <FormControl fullWidth>
                                <Select
                                    sx={{
                                        color: 'white',
                                        backgroundColor: 'primary.light',
                                    }}

                                    value={sort}
                                    defaultValue='Bubble Sort'
                                    onChange={handleSelect}
                                >
                                    {
                                        Object.keys(props.sortMappings).map(key =>
                                            <MenuItem value={key} key={key}> {key} </MenuItem>
                                        )
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Box display='flex' width='50%' justifyContent='end' alignItems='center'>
                        <Box mx={3}>
                            <Button {...btn} onClick={handlePopperOpen}>
                                <Typography color="white">Generate</Typography>
                                <DataObjectIcon fontSize='large' sx={{ color: 'white' }} />
                            </Button>
                            <Popper open={open} anchorEl={popperAnchor} placement='bottom' transition>
                                {({ TransitionProps }) => (
                                    <Fade {...TransitionProps} timeout={350}>
                                        <Paper>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                >
                                                    <Typography variant='h5'>Write your own array!</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography color="initial">Each item should be a number, and there should be a comma after every number.</Typography>
                                                    <Box display = 'flex' alignItems='center'>
                                                        <TextField 
                                                            variant="outlined" 
                                                            placeholder='Enter list.'
                                                            name='array'
                                                            value = {formInput.array}
                                                            onChange={handleTextInput}/>
                                                        <Button variant = 'contained' size = 'large' sx={{ml : 2}} onClick = {handleArray}>Go</Button>
                                                    </Box>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                >
                                                    <Typography variant='h5'>Upload a file!</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography color="initial">All numbers should be on a single line, and there should be a comma after every number.</Typography>
                                                    <Button variant='contained' component="label">
                                                        <input accept='.txt' multiple hidden type="file" ref={file} onChange = {handleFile}/>
                                                        <Typography color="white">Upload</Typography>
                                                        <FileUploadIcon />
                                                    </Button>

                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                >
                                                    <Typography variant='h5'>Generate a random array!</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography color="initial">Specify the length of the array.</Typography>
                                                    <TextField 
                                                        label="Length"
                                                        variant="outlined"
                                                        required
                                                        name="length"
                                                        value={formInput.length}
                                                        onChange={handleTextInput}
                                                        sx={{ my: 2 }} />
                                                    <Typography color="initial">Enter the upper and lower bounds</Typography>
                                                    <TextField 
                                                        label="Lower Bound"
                                                        variant="outlined"
                                                        required
                                                        name="min"
                                                        value={formInput.min}
                                                        onChange={handleTextInput}
                                                        sx={{ my: 2, mr: 2 }} />
                                                    <TextField 
                                                        label="Upper Bound"
                                                        variant="outlined"
                                                        required
                                                        name="max"
                                                        value={formInput.max}
                                                        onChange={handleTextInput}                                         
                                                        sx={{ my: 2 }} />
                                                    <FormControl sx={{display : 'block'}}>
                                                        <FormLabel id="demo-row-radio-buttons-group-label">Distribution</FormLabel>
                                                        <RadioGroup
                                                            row
                                                            value={radioInput}
                                                            onChange={handleRadioInput}
                                                        >
                                                            <FormControlLabel
                                                                control={<Radio />}
                                                                label="uniform"
                                                                value="uniform"
                                                            />
                                                            <FormControlLabel
                                                                control={<Radio />}
                                                                label="normal"
                                                                value="normal"
                                                            />
                                                        </RadioGroup>
                                                    </FormControl>
                                                    <Button variant = 'contained' onClick = {handleRandom}>Generate</Button>
                                                </AccordionDetails>

                                            </Accordion>

                                        </Paper>
                                    </Fade>
                                )}
                            </Popper>
                        </Box>
                        <Box mx={3}>
                            <Button {...btn} onClick={handlePlaying}>
                                {
                                    playing ?
                                        <>
                                            <Typography color="white">Pause</Typography>
                                            <PauseIcon fontSize='large' sx={{ color: 'white' }} />
                                        </>
                                        :
                                        <>
                                            <Typography color="white">Play</Typography>
                                            <PlayArrowIcon fontSize='large' sx={{ color: 'white' }} />
                                        </>

                                }
                            </Button>
                        </Box>
                        <Box width={150} mx={3}>
                            <Typography color="white" mt={1}>Speed</Typography>
                            <Slider
                                value={fps}
                                onChange={handleSlider}
                                defaultValue={60}
                                min={1}
                                max={60}
                                color="secondary"
                            />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
