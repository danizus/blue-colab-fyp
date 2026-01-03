import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, X, Send, Wrench, Loader2 } from 'lucide-react';
import { chatSuggestions } from '@/data/mockData';
import { ChatMessage } from '@/types';

const mockResponses = [
  "Based on your profile, getting OSHA 30 certification would increase your match scores for most jobs.",
  "Great question! For trade interviews, focus on your hands-on experience and specific projects. Bring photos if you have them.",
  "Your resume looks solid! Consider adding certifications and specific equipment you're trained on.",
];

export function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: "Hey! I'm here to help with your job search. What can I help you with?", timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: text, timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: mockResponses[Math.floor(Math.random() * mockResponses.length)], timestamp: new Date() }]);
    setIsLoading(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-xl z-50 ${isOpen ? 'hidden' : ''}`}>
        <MessageSquare className="w-6 h-6" />
      </Button>
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-[380px] h-[500px] bg-card border-border shadow-2xl z-50 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border bg-secondary flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center"><Wrench className="w-4 h-4 text-background" /></div>
              <div><h3 className="font-semibold text-foreground text-sm">Career Assistant</h3><p className="text-xs text-muted-foreground">Here to help</p></div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}><X className="w-4 h-4" /></Button>
          </div>
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-foreground text-background' : 'bg-secondary text-foreground'}`}>{msg.content}</div>
                </div>
              ))}
              {isLoading && <div className="flex justify-start"><div className="bg-secondary p-3 rounded-lg"><Loader2 className="w-4 h-4 animate-spin text-muted-foreground" /></div></div>}
            </div>
          </ScrollArea>
          {messages.length <= 2 && (
            <div className="p-3 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-1">{chatSuggestions.slice(0, 2).map((s, i) => <Button key={i} variant="outline" size="sm" className="text-xs h-7" onClick={() => sendMessage(s)}>{s.slice(0, 35)}...</Button>)}</div>
            </div>
          )}
          <div className="p-3 border-t border-border">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
              <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask me anything..." className="bg-background border-border" />
              <Button type="submit" size="icon" disabled={!input.trim() || isLoading}><Send className="w-4 h-4" /></Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
}
