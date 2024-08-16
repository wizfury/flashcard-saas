'use client'

import { db } from "@/firebase"
import { useUser } from "@clerk/nextjs"
import { Container,Box, Typography, Button, TextField, Paper } from "@mui/material"
import { collection, writeBatch } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Generate()
{
    const {isLoaded, isSingnedin,user}=useUser()
    const {flashcards, setflashcards}= useState()
    const [flipped, setFlipped]=useState()
    const [text, setText] = useState('')
    const [name, setName]=useState('')
    const [open, setOpen]=useState(false)
    const router = useRouter()

    const handleSubmit= async ()=>{
        fetch('api/generate',{
            method:'POST',
            body: text,
        }).then((res)=> res.json())
        .then(data > setflashcards(data))
    }

    const handleCardClick = (id)=>{
        setFlipped((prev)=>({
            ...prev,
            [id]:!prev[id]
        }))
    }

    const handleOpen=()=>{
        setOpen(true)
    }

    const handleClose=()=>{
        setOpen(false)

    }

    const saveFlashcards = async()=>{
        if (!name)
        {
            alert('Please enter a name')
            return
        }
        const batch = writeBatch(db)
        const userDocRef = doc(collection(db,'users'),user.id)
        const docSnap = await getDoc(userDocRef)

        if (docSnap.exists())
        {
            const collections = docSnap.data().flashcards || []
            if (collections.find((f)=> f.name===name)){
                alert('Flashcard collection with same name already exists')
                return
            }
            else{
                collections.push({name})
                batch.set(userDocRef,{flashcards: collections},{merge:true})
            }
        }
        else{
            batch.set(userDocRef,{flashcards: [{name}]})
        }
        const collref = collection(userDocRef,name)
        flashcards.forEach(element => {
            const cardDocRef = doc(collref)
            batch.set(cardDocRef,flashcards) 
        });

        await batch.commit()
        handleClose()
        router.push('/flashcards')

    }

    return (<Container maxWidth="md" alignItems='center'>
        <Box sx ={{
             my: 4,
            display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'           
            }}>
            <Typography variant="h4" component={"h1"} gutterBottom>
                Generate Flashcards
            </Typography>
            <Paper sx={{
                p: 4,
                width: '100%'
            }}>
                <TextField value={text} onChange={(e)=> setText(e.target.value)} label="Enter text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{mb:2}}
                    >

                </TextField>
                <Button onClick={handleSubmit} variant="contained" color="primary">Generate Flashcards</Button>

            </Paper>
            

        </Box>
    </Container>)
}