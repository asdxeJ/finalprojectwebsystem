public class UploadFile
{
    public string Upload(IFormFile file)
    {
        // extension
        List<string> validExtensions = new List<string>() { ".jpg", ".png" };
        string extension = Path.GetExtension(file.FileName);
        if (!validExtensions.Contains(extension)) // Change to !Contains
        {
            return $"Extension is not valid({string.Join(", ", validExtensions)})";
        }

        // file size
        long size = file.Length;
        if (size > (5 * 1024 * 1024))
            return "Maximum size is 5mb";

        // name changing
        string fileName = Guid.NewGuid().ToString() + extension;
        string path = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");
        if (!Directory.Exists(path))
        {
            Directory.CreateDirectory(path); // Ensure the directory exists
        }
        using FileStream stream = new FileStream(Path.Combine(path, fileName), FileMode.Create);
        file.CopyTo(stream);

        return fileName; // Return the file name or path
    }
}