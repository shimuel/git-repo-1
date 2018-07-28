namespace TodoApi.Models
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Priority { get; set; }
        public string Comments { get; set; }

        public bool IsComplete { get; set; }
    }
}