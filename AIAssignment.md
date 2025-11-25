# Homework 4 AI Synthesis Activity

Only complete one of the assignments below! You can delete the other assignment in this document once you've made your choice.

## Activity B: You did NOT use AI

### Part 1

> Explain some improvement you want to make within your code. Perhaps you have a code block that could be more concise, or a part of your code could be improved with a library or be performed with a more efficient algorithm.

> I feel that my handling of displaying the pokemon, whether it be in the entire list or within my box could be better. I feel that my logic is sound, but a different library can maybe add more flair than just the css and html combo.

### Part 2

> Ask AI how to improve your code, by picking a part of your program you are interested in improving and asking something along the lines of "how can I improve this code?" This does not have to be verbatim; you could ask more specific questions for improvement, like "what JavaScript libraries could improve the efficiency of my code?" Screenshot or link the response.

> Prompt: My app is being used to display pokemon and have functionality similar to a pokedex where I can catch different pokemon and add them to my box through API calls. What kinds of libraries can I use to improve the look and feel of my app?

(I proceeded to provide the following files for context: App.tsx, App.css, PokemonList.tsx, PokemonCard.tsx)

LLM Response: Based on your Pokédex app, here are several libraries you can use to enhance the look and feel. You already have access to some powerful libraries in Claude artifacts:
Available Libraries You Can Use
1. Lucide React (for icons)
typescriptimport { Heart, Star, Trash2, Edit, Search, ChevronLeft, ChevronRight } from 'lucide-react';
This would be perfect for adding icons to your buttons, navigation tabs, and actions. For example:

Pokéball icon for the catch button
Search icon for filtering Pokémon
Navigation arrows for pagination
Edit/Delete icons in your box

2. Recharts (for data visualization)
typescriptimport { RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
You could create beautiful radar charts to visualize Pokémon stats (HP, Attack, Defense, etc.) in the details modal instead of just listing them.
3. Framer Motion (for animations)
While not explicitly listed in your available libraries, you can achieve smooth animations with CSS transitions and transforms. However, if you want more advanced animations, you could add:

Card flip animations when clicking Pokémon
Slide-in transitions for the modal
Bounce effect when catching a Pokémon
Stagger animations for the grid

4. shadcn/ui (pre-built components)
typescriptimport { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
This gives you polished, accessible components for cards, badges, alerts, dialogs, and more.

Specific Improvements I'd Recommend

Add Lucide icons to buttons and navigation for visual clarity
Use Recharts to display stats as a radar chart in PokemonDetails
Implement shadcn/ui components for a more polished, consistent design system
Enhance with CSS animations for card hovers, page transitions, and catch animations

Would you like me to create an updated version of your app incorporating any of these libraries? I can show you how to add stat visualizations, icon enhancements, or better component styling.

### Part 3

> Evaluate the response the AI generates. You may need to do some research to do this evaluation, to see if the syntax generates correctly or if any libraries the AI suggests are appropriate for the current task. Report on whether the AI's solution fits within your project, or if it would need modifications to work properly.

> The use of Lucide, Recharts, shadcn/ui, and framer motion is useful, but it may require me to fully restructure my project and install new libraries while also figuring out how to use them properly. Having a look at the libraries, they do seem very nice and would help to make a better looking app. Stuff like edit, trash2, plus from Lucide React looks good and would help the style of the app. Similarly, things like <AlertCircle> from shadcn/ui could be useful for things like showing "SUCCESS!" when catching a pokemon. So, in sum, the libraries would require a lot of reading the documentation and understanding what is possible with them, but would probably result in a better looking app than what I have come up with. They might also probably handle resizing the screen better than the different pixel sizes that I used in the css file.

**_ You do NOT need to use the AI suggestion within your final submission, if your code already works properly. If the scope of your inquiry in this activity leads you to replace parts of your code, switch to the other version of this activity instead. _**
